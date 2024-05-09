"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { User, Users } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";


const mainLinks = [
  { href: "/profile", label: "Your Profile", icon: faUser },
  { href: "/family", label: "Your Family", icon: faUsers },
];

const familySublinks = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/contacts", label: "Contacts" },
  { href: "/philanthropy", label: "Philanthropy" },
  { href: "/policy-tree", label: "Policy Tree" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/wealth-forest", label: "Wealth Forest" },
  { href: "/asset-allocation", label: "Asset Allocation" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/org-chart", label: "Organizational Chart" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/pdf", label: "Print PDF" },
  { href: "/video", label: "Videos" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start px-2 text-sm font-medium md:mt-5 lg:mt-1 lg:px-4 print:hidden">
      {mainLinks.map(({ href, label, icon }) => (
        <Link key={label} className="w-full cursor-pointer" href={href}>
          <Button
            variant={pathname === href ? "default" : "ghost"}
            className="w-full flex items-center gap-2"
          >
            <FontAwesomeIcon icon={icon} className="h-4 w-4" />
            {label}
          </Button>
        </Link>
      ))}
      <Separator className="mx-auto mt-2 w-[90%]" />
      {familySublinks.map((link) => (
        <Link
          key={link.label}
          className="w-full cursor-pointer"
          href={link.href}
        >
          <Button
            variant={pathname === link.href ? "default" : "ghost"}
            className="w-full"
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
