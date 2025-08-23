"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Logout from '@/components/ui/logout-button'
import { Skeleton } from '@/components/ui/skeleton'
import { StoreType } from '@/lib/types'
import { Plus, LinkIcon, ExternalLink, LayoutDashboard, StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function StoreList() {
  const router = useRouter()
  const [stores, setStores] = useState<StoreType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const checkUser = async () => {
      const res = await fetch(`/api/auth/check-user`);
      const data = await res.json();
      if (!data.isUser) {
        router.push('/signin');
      } else {
        fetchStores()
      }
    }

    checkUser()

  }, [router])


  const fetchStores = async () => {
    try {
      const res = await fetch('/api/store/get-all')
      if (!res.ok) return router.push('/onboarding')

      const data = await res.json()
      if (!data.stores || data.stores.length === 0) {
        router.push('/onboarding')
      } else {
        console.log("STORES", data.stores)
        setStores(data.stores)
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[180px]" />
                <Skeleton className="h-4 w-[220px]" />
              </CardHeader>
              <CardContent className="flex gap-3 pb-6">
                <Skeleton className="h-10 w-[120px]" />
                <Skeleton className="h-10 w-[150px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!stores) return <div className="p-6">No stores found</div>



  return (
    <div className="min-w-screen mx-auto p-4 md:p-2 space-y-6 min-h-screen">
      {/* Header Section */}
      <div className="pb-4 md:p-6 flex mx-0 flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold">Your Stores</h1>
          <p className="text-sm text-muted-foreground">
            Manage your stores and access their dashboards
          </p>
        </div>
        <div className='flex flex-col sm:flex-row w-full md:w-auto gap-2'>
          <Button
            onClick={() => router.push('/onboarding')}
            className="w-full md:w-auto"
            variant="default"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Store
          </Button>
          <Logout />
        </div>
      </div>

      {/* Stores Grid */}
      {stores.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 mx-2 rounded-lg border border-dashed">
          <StoreIcon className="h-10 w-10 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No stores yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Get started by creating your first store</p>
          <Button
            onClick={() => router.push('/onboarding')}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Store
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => {
            const domain = store.domain || `${process.env.NEXT_PUBLIC_DOMAIN}/${store.slug}`
            const dashboardUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${store.slug}/dashboard/home`

            return (
              <Card
                key={store._id}
                className="hover:shadow transition-all duration-200 overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <StoreIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{store.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <span className="truncate text-sm">{domain}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(`https://${domain}`, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Visit</span>
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => router.push(`https://${dashboardUrl}`)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
