"use client";
import ImageBucket from '@/components/dashboard/image-bucket';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/context/store-context';
import { copyToClipBoard } from '@/lib/utils';
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';


const Home = () => {
  const store = useStore()
  const storeLink = store ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/${store.slug}` : '';


  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Menu Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Input
                value={storeLink}
                readOnly
                className="flex-1 py-2 "
              />
              <div className=' w-full flex items-start gap-2'>
                <Button
                  onClick={() => {
                    if (store) {
                      copyToClipBoard(storeLink)
                    }
                  }}
                  variant="default"
                  className=' bg-green-600'
                  disabled={!storeLink}
                >
                  Copy Link
                </Button>
                <a href={storeLink} target="_blank" rel="noopener noreferrer">
                  <Button className=' bg-blue-600' variant="default" >
                    View Store
                  </Button>
                </a>
              </div>

            </div>
            <div className="text-sm text-muted-foreground">
              Share this link with your customers
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create your Store</CardTitle>
                <CardDescription className="mt-1">
                  Add all your products
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <Button
                onClick={() => { }}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
              >
                Add Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Edit your Store Details</CardTitle>
                <CardDescription className="mt-1">
                  Add details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <Button
                onClick={() => { }}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
              >
                Edit Store Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <ImageBucket onSelect={(url:string)=>{
          toast.message(url)
        }}/>
      </div>
    </div>
  )
}

export default Home