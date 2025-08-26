import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-600 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Header with badge */}
        <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-white text-green-600 text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          Start Selling Online Today
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to launch your{' '}
          <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            online store?
          </span>
        </h2>
        
        <p className="md:text-xl text-sm text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join thousands of successful businesses selling online with 2cd Site. 
          Start your e-commerce journey with zero technical skills required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="/signup" 
            className="group px-6 py-3 bg-white text-green-700 font-semibold rounded-md shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl inline-flex items-center justify-center gap-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <p className="mt-6 text-green-200 text-sm">
          No credit card required • Setup in minutes • 3-day free trial
        </p>
      </div>
    </section>
  )
}