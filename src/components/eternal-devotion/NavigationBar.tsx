
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, Heart, Home, Image as ImageIcon, CalendarDays, ScrollText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#gallery", label: "Gallery", icon: ImageIcon },
  { href: "#timeline", label: "Our Journey", icon: CalendarDays },
  { href: "#love-letter", label: "Love Note", icon: ScrollText },
];

export default function NavigationBar() {
  const isMobile = useIsMobile();

  const desktopNav = (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
      {navLinks.map((link) => (
        <Button key={link.label} variant="ghost" asChild className="text-sm lg:text-base text-foreground hover:bg-primary/10 hover:text-primary px-3 py-2">
          <Link href={link.href} className="flex items-center gap-2">
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );

  const mobileNav = (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden text-primary border-primary hover:bg-primary/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-background p-0 pt-6">
        <div className="mb-6 flex items-center space-x-2 px-6">
          <Heart className="h-7 w-7 text-primary" />
          <span className="text-2xl font-script text-primary">Navigation</span>
        </div>
        <nav className="flex flex-col space-y-1 px-3">
          {navLinks.map((link) => (
            <SheetClose key={link.label} asChild>
              <Button variant="ghost" asChild className="justify-start text-lg text-foreground hover:bg-primary/10 hover:text-primary p-3">
                <Link href={link.href} className="flex items-center gap-3">
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="#home" className="flex items-center space-x-2 group">
          <Heart className="h-8 w-8 text-primary transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          <span className="font-script text-3xl text-primary hidden sm:inline">Eternal Devotion</span>
        </Link>
        {isMobile ? mobileNav : desktopNav}
      </div>
    </header>
  );
}
