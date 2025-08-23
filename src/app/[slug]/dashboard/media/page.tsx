"use client"
import ImageBucket from "@/components/dashboard/image-bucket"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card" // Assuming you're using shadcn/ui or similar
import { Inbox, Plus } from "lucide-react"
import router from "next/router"

const AllMedia = () => {
  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Inbox className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-800">
                All Media Files
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
               Manage all your media files in one place
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ImageBucket
              onSelect={() => { }}
            />
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default AllMedia