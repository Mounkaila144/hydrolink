"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Phone, Mail, ChevronDown, User, LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { RegisterModal } from "@/components/auth/register-modal";
import siteData from "@/content/site.fr.json";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const t = useTranslations();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = siteData.nav as Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/90">
      {/* Top Bar mkl - Hidden on te mobile mkl */}
      <div className="hidden md:block border-b border-neutral-100 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+22791270951"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="font-medium">+227 91 27 09 51</span>
              </a>
              <a
                href="mailto:hydrolinkbtp@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="font-medium">hydrolinkbtp@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 bg-accent-500 rounded-full animate-pulse"></span>
                <span>Niamey, Niger</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-20 sm:h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 ring-2 ring-primary-100 group-hover:ring-primary-300 flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="hydrolink-BTP Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-foreground group-hover:text-primary-600 transition-colors leading-tight">
                hydrolink-BTP
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight line-clamp-1">
                Solutions durables
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item, index) => (
                <NavigationMenuItem key={item.href || `nav-item-${index}`}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-primary-50 data-[state=open]:bg-primary-50 font-medium">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2">
                          {item.children.map((child) => (
                            <NavigationMenuLink key={child.href} asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary-50 hover:shadow-md border border-transparent hover:border-primary-200",
                                  pathname === child.href && "bg-primary-50 border-primary-200 shadow-sm"
                                )}
                              >
                                <div className="text-sm font-semibold leading-none text-foreground">
                                  {child.label}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                  Découvrez nos services en {child.label.toLowerCase()}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-lg bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-700 focus:bg-primary-50 focus:text-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          pathname === item.href && "bg-primary-50 text-primary-700 font-semibold"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth & CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t('auth.profile.title')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('auth.profile.account')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('auth.profile.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hover:bg-primary-50"
                >
                  {t('auth.login.signIn')}
                </Button>
                <Button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="btn-accent"
                >
                  {t('auth.register.createAccount')}
                </Button>
              </>
            )}
            <Button asChild className="btn-primary shadow-md hover:shadow-lg transition-all duration-300">
              <Link href="/contact">
                {t("homepage.hero.ctaPrimary")}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-primary-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white animate-slide-down">
            <div className="px-3 py-4 space-y-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {navigation.map((item, index) => (
                <div key={item.href || `mobile-nav-item-${index}`}>
                  {item.children ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                        className="w-full px-4 py-3 text-sm font-semibold text-primary-700 bg-primary-50 rounded-lg flex items-center justify-between hover:bg-primary-100 transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openSubmenu === item.label && "rotate-180"
                        )} />
                      </button>
                      {openSubmenu === item.label && (
                        <div className="pl-4 space-y-1 animate-slide-down">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                                pathname === child.href
                                  ? "bg-primary-100 text-primary-700 shadow-sm"
                                  : "text-muted-foreground hover:bg-primary-50 hover:text-primary-700"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        pathname === item.href
                          ? "bg-primary-100 text-primary-700 shadow-sm font-semibold"
                          : "text-muted-foreground hover:bg-primary-50 hover:text-primary-700"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Auth Section - Mobile */}
              <div className="pt-4 mt-4 border-t border-neutral-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 bg-primary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('auth.profile.logout')}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      {t('auth.login.signIn')}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsRegisterModalOpen(true);
                      }}
                      className="w-full btn-accent"
                    >
                      {t('auth.register.createAccount')}
                    </Button>
                  </>
                )}
              </div>

              {/* Contact Info Section */}
              <div className="pt-4 mt-4 border-t border-neutral-200 space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4">
                  Nous contacter
                </div>
                <a
                  href="tel:+22791270951"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary-600" />
                  <span>+227 91 27 09 51</span>
                </a>
                <a
                  href="mailto:hydrolinkbtp@gmail.com"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary-600" />
                  <span className="text-xs">hydrolinkbtp@gmail.com</span>
                </a>
                <div className="px-4 pt-2">
                  <Button asChild className="w-full btn-primary shadow-md">
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      {t("homepage.hero.ctaPrimary")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </header>
  );
}