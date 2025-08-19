"use client";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/context/store-context"
import { Globe2 } from "lucide-react"
import { useEffect, useState } from "react";

const CustomDomainPage = () =>{
    const store = useStore();
    const [domain, setDomain] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(store.slug){
            setIsLoading(false);
        }
    },[store])
    return(

        <div className="p-4 ">
            {
                isLoading?
                <BouncingDotsLoader/>:
                <Card className="mb-6">
                    <CardHeader className="">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Globe2 className="h-5 w-5 text-gray-500" />
                            Custom Domain
                        </CardTitle>
                        <CardDescription>
                            Add Custom Domain for your Ecommerce Store
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 border-b">
                   <div className=" flex items-center justify-start"> 
                    <Input
                    value={store.domain}
                    placeholder="domain.com"
                    onChange={(e)=>setDomain(e.target.value)}
                    />
                    <Button>Add Domain</Button></div>
                    </CardContent>
                    <CardFooter>
                        
                    </CardFooter>
                </Card>
            }
        </div>
    )
}

export default CustomDomainPage