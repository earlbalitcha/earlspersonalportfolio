"use client";

import Link from "next/link";
import Image from "next/image";
import {useTheme} from "next-themes";
import {useState, useEffect} from "react";
import {Button} from "../ui/button";
import {Github, Linkedin, Mail} from "lucide-react";

export default function Footer() {
  const {resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo to show based on theme
  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/logo-light.png" : "/logo-dark.png";

  return (
    <footer className="border-t border-gray-200 py-12 bg-[#7f7878]">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link href="/" className="font-bold text-xl font-montserrat">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Earl
            </span>
            <span className="text-foreground">Balitcha</span>
          </Link>
          <p className="text-sm text-black dark:text-gray-300 mt-2">
            © {new Date().getFullYear()} Earl Balitcha. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://github.com/earlbalitcha"
            target="_blank"
            rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-card hover:bg-muted text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/earlbalitcha/"
            target="_blank"
            rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-card hover:bg-muted text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="mailto:earlbalitcha@gmail.com">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-card hover:bg-muted text-muted-foreground hover:text-primary">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
