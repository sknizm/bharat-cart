"use client";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import CustomTextLogo from '@/components/ui/custom-logo';
import ErrorIcon from '@/components/ui/error-icon';
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/context/store-context';
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const SignIn = () => {
  const router = useRouter();
  const store = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


 
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("")

    try {
      const res = await fetch("/api/customer/auth/signin", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login Successful");
        router.push(`/${store.slug}/customer-dashboard/account`)
      } else {
        setErrorMessage(data.error)
      }
    } catch (err) {
      setErrorMessage(`${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl overflow-hidden border border-green-100">
        <CardHeader className="flex flex-col items-center justify-center space-y-2 text-center">
         {
          store &&(
            <CustomTextLogo text={store.name}/>
          )
         }
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-green-800">Login to your Account</CardTitle>
            <CardDescription className="text-gray-600">
              Please enter your credentials below
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <div className=' w-full flex justify-end'>
                <Link className=' text-xs text-green-600 hover:text-green-700 hover:underline'
                  href={'/forget-password'}>Forget Password</Link>

              </div>
            </div>


            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : "Login"}
            </Button>

            {errorMessage && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                <ErrorIcon/>
                {errorMessage}
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={`/${store.slug}/signup`}
              className="font-medium text-green-600 hover:text-green-700 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn