"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LucideStethoscope,
  LucideArrowRight,
  LucideBlinds as LucideLungs,
  LucideActivity,
  LucideShield,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
import LanguageSwitcher from "@/components/language-switcher"

export default function Home() {
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LucideStethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-800">{t.brand}</span>
          </div>
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <Link href="/about">
              <Button variant="ghost">{t.about}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">{t.contact}</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">{t.login}</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight text-balance">{t.heroTitle}</h1>
            <p className="mt-6 text-lg text-gray-600 text-pretty">{t.heroSubtitle}</p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  {t.getStarted}
                  <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline">{t.viewDemo}</Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
              <img
                src="/medical-imaging-platform-dashboard-with-ct-scans.jpg"
                alt="Medical diagnostic platform"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-12">{t.whyChoose}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <LucideLungs className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.lungExpertTitle}</h3>
              <p className="text-gray-600">{t.lungExpertDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <LucideActivity className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.fastProcessTitle}</h3>
              <p className="text-gray-600">{t.fastProcessDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <LucideShield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.secureDataTitle}</h3>
              <p className="text-gray-600">{t.secureDataDesc}</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.brand}</h3>
              <p className="text-blue-200">{t.footerDesc}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-200 hover:text-white">
                    {t.about}
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-blue-200 hover:text-white">
                    {t.features}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-blue-200 hover:text-white">
                    {t.pricing}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.resources}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-blue-200 hover:text-white">
                    {t.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-blue-200 hover:text-white">
                    {t.documentation}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-blue-200 hover:text-white">
                    {t.support}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.contactInfo}</h3>
              <address className="not-italic text-blue-200">
                <p>{t.emailLabel}: info@best4breath.com</p>
                <p>{t.phoneLabel}: +1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-300">
            <p>
              © {new Date().getFullYear()} {t.brand}. {t.rightsReserved}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
