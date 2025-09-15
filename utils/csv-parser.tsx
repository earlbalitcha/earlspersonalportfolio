export interface PortfolioItem {
  slug: string;
  title: string;
  logo: string;
  mainImage: string;
  shortDescription: string;
  projectUrl: string;
  content: string;
  sortOrder: string;
  categories?: string[];
}

const CACHE_KEY = "__portfolioCacheV2";
const USE_FALLBACK_ONLY = false;

export function resetPortfolioCache() {
  if (typeof window !== "undefined") {
    delete (window as any).__portfolioCache;
    delete (window as any).__portfolioCacheV2;
  }
}

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  if (USE_FALLBACK_ONLY) {
    const fallback = getFallbackPortfolioData();
    if (typeof window !== "undefined") (window as any)[CACHE_KEY] = fallback;
    return fallback;
  }

  if (typeof window !== "undefined" && (window as any)[CACHE_KEY]) {
    return (window as any)[CACHE_KEY];
  }

  try {
    const response = await fetch("/data/portfolio-sample.csv", {
      cache: typeof window === "undefined" ? "no-store" : "default",
    });

    if (!response.ok)
      throw new Error(`Failed to fetch portfolio CSV: ${response.status}`);

    const csvText = await response.text();
    const parsedData = parseCSV(csvText);

    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      const fallback = getFallbackPortfolioData();
      if (typeof window !== "undefined") (window as any)[CACHE_KEY] = fallback;
      return fallback;
    }

    if (typeof window !== "undefined") (window as any)[CACHE_KEY] = parsedData;
    return parsedData;
  } catch (err) {
    console.error("Error fetching portfolio data:", err);
    const fallback = getFallbackPortfolioData();
    if (typeof window !== "undefined") (window as any)[CACHE_KEY] = fallback;
    return fallback;
  }
}

// ---------------- Fallback content (6 projects) ----------------
function getFallbackPortfolioData(): PortfolioItem[] {
  return [
    {
      slug: "super-host-depot",
      title: "Super Host Depot",
      logo: "/projects/superhostdepot.png?height=400&width=600",
      mainImage: "/projects/superhostdepot.png?height=400&width=600",
      shortDescription:
        "One-stop platform for hosts offering property management tools and services.",
      projectUrl: "https://superhostdepot.com",
      content: `<h3>Overview</h3><p>SuperHost Depot simplifies hosting with an all-in-one service platform. Flat-rate subscription, tools for property management, and hands-on support designed for hosts and property managers. Features include booking tools, time-saving workflows, and user-friendly dashboards.</p>`,
      sortOrder: "2024-03-10",
      categories: [
        "Next.js",
        "TypeScript",
        "E-commerce",
        "Responsive",
        "Property Management",
      ],
    },
    {
      slug: "xmgca-platform",
      title: "XMGCA Platform",
      logo: "/projects/xmgcawebsite.png?height=400&width=600",
      mainImage: "/projects/xmgcawebsite.png?height=400&width=600",
      shortDescription:
        "Corporate real estate website with multilingual support and investment solutions.",
      projectUrl: "https://xmgca.com/en",
      content: `<h3>Overview</h3><p>XMG provides real estate management, financing, and rental services. The platform emphasizes trust, transparency, and personalized property strategies. Features include multilingual support, mission-driven content, and a modern corporate presence.</p>`,
      sortOrder: "2024-03-01",
      categories: [
        "Next.js",
        "Internationalization",
        "Corporate",
        "Modern UI",
        "Real Estate",
      ],
    },
    {
      slug: "shopify-integration",
      title: "Shopify Integration",
      logo: "/projects/shopifyorder.png?height=400&width=600",
      mainImage: "/projects/shopifyorder.png?height=400&width=600",
      shortDescription:
        "Integrated Shopify e-commerce data into a centralized dashboard.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>A one-stop dashboard for managing Shopify orders and store data. Includes custom themes, Liquid components, and storefront integration directly connected to the admin dashboard.</p>`,
      sortOrder: "2024-02-20",
      categories: ["Shopify", "Liquid", "JavaScript", "E-commerce Dashboard"],
    },
    {
      slug: "hubspot-integration",
      title: "HubSpot Integration",
      logo: "/projects/hubspotinteg.png?height=400&width=600",
      mainImage: "/projects/hubspotinteg.png?height=400&width=600",
      shortDescription:
        "CRM contact form integration to capture leads directly into HubSpot.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>Custom HubSpot integration where user form submissions sync directly to HubSpot CRM. Enables automation, lead capture, and workflow efficiency.</p>`,
      sortOrder: "2024-02-10",
      categories: ["HubSpot", "API Integration", "CRM", "Automation"],
    },
    {
      slug: "react-dashboard",
      title: "React Dashboard",
      logo: "/projects/dashboard.png?height=400&width=600",
      mainImage: "/projects/dashboard.png?height=400&width=600",
      shortDescription:
        "Modern admin dashboard with analytics, charts, and property insights.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>Built with React and TypeScript, this admin dashboard includes data visualization, occupancy rate tracking, rental revenue analytics, and role-based user management. Features area and donut charts for actionable insights.</p>`,
      sortOrder: "2024-01-30",
      categories: ["React", "TypeScript", "Dashboard", "Analytics", "Data Viz"],
    },
    {
      slug: "clickup-integration",
      title: "ClickUp Task Integration",
      logo: "/projects/clickup.png?height=400&width=600",
      mainImage: "/projects/clickup.png?height=400&width=600",
      shortDescription:
        "Seamless ClickUp integration for centralized task and project tracking.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>Integrated ClickUp task management directly into the dashboard. Features include syncing task data, project status updates, and productivity workflows to provide a single hub for property and project management.</p>`,
      sortOrder: "2024-01-20",
      categories: [
        "ClickUp",
        "API Integration",
        "Project Management",
        "Productivity",
      ],
    },
  ];
}

// ---------------- CSV parser ----------------
function parseCSV(csvText: string): PortfolioItem[] {
  if (!csvText || !csvText.trim()) return [];

  const lines = csvText.split("\n");
  if (lines.length === 0) return [];

  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().replace(/^"/, "").replace(/"$/, ""));

  const columnMap: Record<
    string,
    Exclude<keyof PortfolioItem, "categories">
  > = {
    Slug: "slug",
    Title: "title",
    Logo: "logo",
    "Main Image": "mainImage",
    "Short Description": "shortDescription",
    "Project URL": "projectUrl",
    Content: "content",
    "Sort Order": "sortOrder",
  };

  const catHeaderIndex = headers.indexOf("Categories");
  const items: PortfolioItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trim()) continue;

    const values: string[] = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') insideQuotes = !insideQuotes;
      else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""));
        currentValue = "";
      } else currentValue += char;
    }
    values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""));

    const item: Partial<PortfolioItem> = {};
    headers.forEach((header, idx) => {
      const key = columnMap[header];
      if (key && idx < values.length) {
        (item as any)[key] = values[idx];
      }
    });

    if (catHeaderIndex !== -1 && values[catHeaderIndex]) {
      const raw = values[catHeaderIndex]
        .trim()
        .replace(/^"/, "")
        .replace(/"$/, "");
      (item as PortfolioItem).categories = raw
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    items.push(item as PortfolioItem);
  }

  return items.sort(
    (a, b) => new Date(b.sortOrder).getTime() - new Date(a.sortOrder).getTime()
  );
}
