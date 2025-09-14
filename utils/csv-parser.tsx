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
      logo: "/placeholder.svg?height=400&width=600",
      mainImage: "/placeholder.svg?height=400&width=600",
      shortDescription:
        "E-commerce platform built with Next.js for hosting solutions and services.",
      projectUrl: "https://superhostdepot.com",
      content: `<h3>Overview</h3><p>Next.js-powered storefront with responsive UI and a scalable product catalog.</p>`,
      sortOrder: "2024-03-10",
      categories: ["Next.js", "TypeScript", "E-commerce", "Responsive"],
    },
    {
      slug: "xmgca-platform",
      title: "XMGCA Platform",
      logo: "/placeholder.svg?height=400&width=600",
      mainImage: "/placeholder.svg?height=400&width=600",
      shortDescription:
        "Corporate website with multilingual support and modern design.",
      projectUrl: "https://xmgca.com/en",
      content: `<h3>Overview</h3><p>Internationalized corporate site with clean, modern UI.</p>`,
      sortOrder: "2024-03-01",
      categories: ["Next.js", "Internationalization", "Corporate", "Modern UI"],
    },
    {
      slug: "shopify-integration",
      title: "Shopify Integration",
      logo: "/placeholder.svg?height=400&width=600",
      mainImage: "/placeholder.svg?height=400&width=600",
      shortDescription:
        "Custom Shopify themes and integrations for e-commerce clients.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>Theme customization, Liquid components, and storefront integrations.</p>`,
      sortOrder: "2024-02-20",
      categories: ["Shopify", "Liquid", "JavaScript", "Custom Themes"],
    },
    {
      slug: "hubspot-integration",
      title: "HubSpot Integration",
      logo: "/placeholder.svg?height=400&width=600",
      mainImage: "/placeholder.svg?height=400&width=600",
      shortDescription:
        "CRM integration and automation solutions for business workflows.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>HubSpot APIs, automation, and CRM data sync across systems.</p>`,
      sortOrder: "2024-02-10",
      categories: ["HubSpot", "API Integration", "Automation", "CRM"],
    },
    {
      slug: "react-dashboard",
      title: "React Dashboard",
      logo: "/placeholder.svg?height=400&width=600",
      mainImage: "/placeholder.svg?height=400&width=600",
      shortDescription:
        "Modern admin dashboard with data visualization and user management.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>Rich dashboard, charts, role-based access, and real-time updates.</p>`,
      sortOrder: "2024-01-30",
      categories: ["React", "TypeScript", "Dashboard", "Data Viz"],
    },
    {
      slug: "full-stack-web-app",
      title: "Full Stack Web App",
      logo: "/placeholder.svg?height=400&width=600",
      mainImage: "/placeholder.svg?height=400&width=600",
      shortDescription:
        "Complete web application with authentication and database integration.",
      projectUrl: "https://github.com/earlbalitcha",
      content: `<h3>Overview</h3><p>Next.js frontend, Node.js APIs, Prisma ORM, and SQL Server.</p>`,
      sortOrder: "2024-01-20",
      categories: ["Next.js", "Node.js", "SQL Server", "Prisma"],
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
