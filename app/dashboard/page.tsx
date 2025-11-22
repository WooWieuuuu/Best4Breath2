"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LucideUpload,
  LucideHistory,
  LucideUser,
  LucideLogOut,
  LucideStethoscope,
  LucideCalendar,
  LucideBlinds as LucideLungs,
  LucideAlertCircle,
} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import RecentCasesList from "@/components/recent-cases-list"
import { useLanguage } from "@/lib/language-context"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1 mb-6">
                  <h3 className="font-medium text-sm text-gray-500">{t.loggedInAs}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <LucideUser className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t.doctorName}</p>
                      <p className="text-sm text-gray-500">{t.doctorTitle}</p>
                    </div>
                  </div>
                </div>

                <nav className="space-y-1">
                  <Link href="/dashboard">
                    <Button
                      variant={activeTab === "overview" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("overview")}
                    >
                      <LucideStethoscope className="mr-2 h-4 w-4" />
                      {t.overview}
                    </Button>
                  </Link>
                  <Link href="/dashboard/upload">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("upload")}>
                      <LucideUpload className="mr-2 h-4 w-4" />
                      {t.uploadXray}
                    </Button>
                  </Link>
                  <Link href="/dashboard/history">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("history")}>
                      <LucideHistory className="mr-2 h-4 w-4" />
                      {t.history}
                    </Button>
                  </Link>
                  <Link href="/logout">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LucideLogOut className="mr-2 h-4 w-4" />
                      {t.logout}
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/dashboard/upload">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-1 bg-transparent">
                      <LucideUpload className="h-5 w-5" />
                      <span className="text-xs">{t.newScan}</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/history">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-1 bg-transparent">
                      <LucideHistory className="h-5 w-5" />
                      <span className="text-xs">{t.history}</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">{t.dashboard}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t.totalCases}</p>
                      <p className="text-3xl font-bold">128</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <LucideLungs className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t.thisMonth}</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <LucideCalendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t.pendingReview}</p>
                      <p className="text-3xl font-bold">7</p>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <LucideAlertCircle className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="recent">{t.recentCases}</TabsTrigger>
                <TabsTrigger value="flagged">{t.flaggedCases}</TabsTrigger>
              </TabsList>
              <TabsContent value="recent">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.recentCases}</CardTitle>
                    <CardDescription>{t.recentScansDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentCasesList />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="flagged">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.flaggedCases}</CardTitle>
                    <CardDescription>{t.flaggedCasesDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-gray-500">{t.noFlaggedCases}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
