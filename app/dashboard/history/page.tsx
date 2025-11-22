"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  LucideSearch,
  LucideFilter,
  LucideCalendar,
  LucideUser,
  LucideChevronRight,
  LucideAlertCircle,
  LucideCheckCircle,
  LucideXCircle,
} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/lib/language-context"

interface CaseData {
  id: string
  patientName: string
  patientId: string
  age: number
  gender: string
  date: string
  status: string
  classification: string
  confidence: number
  locations: any[]
  notes: string
}

export default function HistoryPage() {
  const { t, language } = useLanguage()
  const [cases, setCases] = useState<CaseData[]>([])
  const [filteredCases, setFilteredCases] = useState<CaseData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCases()
  }, [])

  useEffect(() => {
    filterCases()
  }, [cases, searchTerm, filterType])

  const fetchCases = async () => {
    try {
      const response = await fetch("/api/cases")
      const data = await response.json()
      setCases(data.cases)
    } catch (error) {
      console.error("Error fetching cases:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterCases = () => {
    let filtered = cases

    if (searchTerm) {
      filtered = filtered.filter(
        (case_) =>
          case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          case_.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((case_) => case_.classification === filterType)
    }

    setFilteredCases(filtered)
  }

  const getStatusBadge = (classification: string, confidence: number) => {
    switch (classification) {
      case "cancer":
        return (
          <Badge className="bg-red-500">
            <LucideAlertCircle className="h-3 w-3 mr-1" />
            {t.cancer} ({Math.round(confidence * 100)}%)
          </Badge>
        )
      case "tumor":
        return (
          <Badge className="bg-amber-500">
            <LucideAlertCircle className="h-3 w-3 mr-1" />
            {t.tumor} ({Math.round(confidence * 100)}%)
          </Badge>
        )
      case "normal":
        return (
          <Badge className="bg-green-500">
            <LucideCheckCircle className="h-3 w-3 mr-1" />
            {t.normal} ({Math.round(confidence * 100)}%)
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <LucideXCircle className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const getClassificationStats = () => {
    const stats = {
      total: cases.length,
      cancer: cases.filter((c) => c.classification === "cancer").length,
      tumor: cases.filter((c) => c.classification === "tumor").length,
      normal: cases.filter((c) => c.classification === "normal").length,
    }
    return stats
  }

  const stats = getClassificationStats()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">{t.loadingHistory}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t.historyTitle}</h1>
            <p className="text-gray-500 mt-1">{t.historyDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.all}</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <LucideUser className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.cancer}</p>
                  <p className="text-3xl font-bold text-red-600">{stats.cancer}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <LucideAlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.tumor}</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.tumor}</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <LucideAlertCircle className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.normal}</p>
                  <p className="text-3xl font-bold text-green-600">{stats.normal}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <LucideCheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">{t.all}</option>
                  <option value="cancer">{t.cancer}</option>
                  <option value="tumor">{t.tumor}</option>
                  <option value="normal">{t.normal}</option>
                </select>
                <Button variant="outline">
                  <LucideFilter className="h-4 w-4 mr-2" />
                  {t.filter}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.allCases}</CardTitle>
            <CardDescription>
              {t.showing} {filteredCases.length} {t.of} {cases.length} {t.cases}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t.noResults}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredCases.map((case_) => (
                  <Link
                    key={case_.id}
                    href={`/dashboard/case/${case_.id}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <LucideUser className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{case_.patientName}</p>
                            <p className="text-xs text-gray-500">
                              {case_.patientId} • {case_.age} {t.years} • {case_.gender === "male" ? t.male : t.female}
                            </p>
                          </div>
                        </div>
                        <div className="ml-13 flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <LucideCalendar className="h-3 w-3" />
                            {new Date(case_.date).toLocaleDateString(
                              language === "th" ? "th-TH" : language === "ko" ? "ko-KR" : "en-US",
                            )}
                          </div>
                          {getStatusBadge(case_.classification, case_.confidence)}
                          {case_.locations && case_.locations.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {t.foundLocations.replace("{count}", case_.locations.length.toString())}
                            </Badge>
                          )}
                        </div>
                        {case_.notes && <p className="ml-13 mt-1 text-sm text-gray-600 truncate">{case_.notes}</p>}
                      </div>
                      <div className="ml-4">
                        <LucideChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
