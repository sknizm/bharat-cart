"use client";
import { Footer } from "@/components/store/footer"
import { Header } from "@/components/store/header"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, Package,  Home } from "lucide-react"

const ThankYouPage = () => {
    const router = useRouter();
    const { slug } = useParams(); 

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-8">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="rounded-full bg-green-100 p-4">
                            <CheckCircle className="h-16 w-16 text-green-600" />
                        </div>
                    </div>
                    
                    {/* Success Message */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                        <p className="text-lg text-gray-600">
                            Thank you for your purchase. Your order has been received and is being processed.
                        </p>
                    </div>
                    
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            onClick={() => router.push(`/${slug}`)}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                        >
                            <Home className="h-4 w-4" />
                            Return to Store
                        </Button>
                        
                        <Button 
                            onClick={() => router.push(`/${slug}/customer-dashboard/orders`)}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Package className="h-4 w-4" />
                            View Order Details
                        </Button>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="text-center text-sm text-gray-500">
                        <p>Contact support if you have any questions about your order.</p>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    )
}

export default ThankYouPage;