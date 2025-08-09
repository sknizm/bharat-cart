"use client"
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import Logout from '@/components/ui/logout-button'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function StoreList(){
  const router = useRouter()
  const [stores, setStores] = useState([]);
   const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

    fetchStores()
  }, [router])


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
    <div className=' min-h-screen flex items-center justify-center'>
      
      <Logout/>
    </div>
  )
}
