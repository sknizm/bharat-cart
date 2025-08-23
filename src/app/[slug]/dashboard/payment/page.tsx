import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

const PaymentPage = () =>{
return(
    <div className="p-4">
        <Card>
             <CardHeader className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl shadow-sm">
                <CreditCard className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-800 font-bold">
                  Payments Options
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Manage your Payment Gateway here
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className=" font-bold animate-bounce w-full text-center transition duration-1000 text-gray-900">
                Coming soon...
            </div>
        </CardContent>
        </Card>
    </div>
)
}
export default PaymentPage