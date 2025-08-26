'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Lock, User, Sparkles } from 'lucide-react'
import Logo from '../ui/logo'

export default function Header({ isLoggedIn = false }) {
  return (
    <header className="w-full px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-green-50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm font-medium hover:bg-green-50 px-3 py-2 rounded-lg">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm font-medium hover:bg-green-50 px-3 py-2 rounded-lg">
              Pricing
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm font-medium hover:bg-green-50 px-3 py-2 rounded-lg">
              Features
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm font-medium hover:bg-green-50 px-3 py-2 rounded-lg">
              Contact
            </Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link 
              href="/store-list" 
              className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              <Link 
                href="/signin" 
                className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors border border-green-100"
              >
                <Lock className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              
              <Button 
                asChild
                className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Link href="/signup">
                  <Sparkles className="h-4 w-4" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}