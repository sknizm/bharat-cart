"use client"
import ImageBucket from "@/components/dashboard/image-bucket"
import { Card, CardHeader, CardContent } from "@/components/ui/card" // Assuming you're using shadcn/ui or similar

const AllMedia = () => {
  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Media Library</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all your uploaded media files in one place
          </p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ImageBucket 
              onSelect={() => {}} 
            />
          </div>
       
        </CardContent>
      </Card>
    </div>
  )
}

export default AllMedia