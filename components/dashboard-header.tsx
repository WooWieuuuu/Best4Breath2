"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideStethoscope, LucideSearch, LucideBell, LucideUser, LucideMenu, LucideX } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LucideStethoscope className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-800">{t.brand}</span>
            </Link>

            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost">{t.dashboard}</Button>
                </Link>
                <Link href="/dashboard/upload">
                  <Button variant="ghost">{t.upload}</Button>
                </Link>
                <Link href="/dashboard/history">
                  <Button variant="ghost">{t.history}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LucideSearch className="h-4 w-4 text-gray-400" />
              </div>
              <Input type="search" placeholder={t.searchPlaceholder} className="pl-10" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />

            <Button variant="ghost" size="icon" className="relative">
              <LucideBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LucideUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t.doctorName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">{t.profile}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">{t.settings}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help">{t.help}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/logout" className="text-red-500">
                    {t.logout}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <LucideX className="h-5 w-5" /> : <LucideMenu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LucideSearch className="h-4 w-4 text-gray-400" />
              </div>
              <Input type="search" placeholder={t.searchPlaceholder} className="pl-10" />
            </div>

            <div className="flex justify-center py-2">
              <LanguageSwitcher />
            </div>

            <nav className="space-y-1">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t.dashboard}
                </Button>
              </Link>
              <Link href="/dashboard/upload" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t.upload}
                </Button>
              </Link>
              <Link href="/dashboard/history" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t.history}
                </Button>
              </Link>
              <Link href="/dashboard/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t.profile}
                </Button>
              </Link>
              <Link href="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t.settings}
                </Button>
              </Link>
              <Link href="/logout" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-red-500">
                  {t.logout}
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
