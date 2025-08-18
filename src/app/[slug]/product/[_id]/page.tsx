"use client"
import { ProductType } from "@/lib/types"
import { SingleProductComponent } from "../SingleProductComponent"
import { Header } from "@/components/store/header"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useStore } from "@/lib/context/store-context"
import { useParams } from "next/navigation"
import { Footer } from "@/components/store/footer"
import ErrorIcon from "@/components/ui/error-icon"

const SingleProductPage = () => {

    const { _id } = useParams();
    const store = useStore();
    const [product, setProduct] = useState<ProductType | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/store/${store.slug}/product/${_id}`);
                const data = await res.json();
                if (res.ok) {
                    setProduct(data.product)
                } else {
                    setError(true)
                }

            } catch (error) {
                console.log(error);
                setError(true)
            } finally {
                setIsLoading(false);
            }
        }
        getProductDetails()
    }, [_id, store.slug]);



   return (
  <div className="min-h-screen bg-gray-50">
    {isLoading ? (
      <div className="p-4 max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb skeleton */}
        <div className="flex space-x-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
        
        {/* Main product skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image gallery */}
          <div className="space-y-2">
            <Skeleton className="h-64 md:h-96 w-full rounded-xl" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-md" />
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            
            <div className="pt-4">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : error ? (
      <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
        <ErrorIcon />
        <h2 className="text-xl font-medium text-gray-900">Failed to load product details</h2>
        <p className="text-gray-600 text-center max-w-md">
          We couldn&apos;t load the product information. Please check your connection and try again.
        </p>
        <button
          onClick={() => {
            if(typeof window !== "undefined"){
                window.location.reload()
            }
          }}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    ) : product ? (
      <>
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <SingleProductComponent product={product} />
        </main>
        <Footer />
      </>
    ) : (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )}
  </div>
)
}
export default SingleProductPage