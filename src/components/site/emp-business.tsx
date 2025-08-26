import { Box, CreditCard, DollarSign, Globe, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function EmpowerBusiness() {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-green-50/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        <Sparkles className="w-4 h-4 mr-2" />
                        No coding required
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
                        <span className="relative">
                            <span className="relative z-10">Start Selling Online</span>
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200/60 -z-10"></span>
                        </span>
                        {' '}<br className=' md:hidden'></br>with 2cd Site
                    </h2>
                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Create a <strong className="font-semibold text-green-700">professional ecommerce store</strong> in minutes.
                        <br className='md:hidden'></br>
                        Grow your business without limits—all in one platform.
                    </p>
                </div>

                {/* Domain Options */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-16">
                    <div className="bg-white p-7 rounded-2xl shadow-lg border border-green-100/50 w-full max-w-sm text-center transition-all hover:shadow-xl hover:-translate-y-1">
                        <div className="text-gray-500 text-sm mb-2 font-medium">Your Store URL</div>
                        <div className="text-xl font-semibold text-gray-700">
                            2cd.site/<span className="text-green-600 font-bold">yourname</span>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                            Free with every account
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                            <div className="w-12 h-0.5 bg-gray-300 md:w-0.5 md:h-12"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-white text-sm font-medium text-gray-500">OR</span>
                        </div>
                    </div>

                    <div className="bg-white p-7 rounded-2xl shadow-lg border border-blue-100/50 w-full max-w-sm text-center transition-all hover:shadow-xl hover:-translate-y-1">
                        <div className="text-gray-500 text-sm mb-2 font-medium">Custom Domain</div>
                        <div className="text-xl font-bold text-blue-600">
                            your-domain<span className="text-green-600">.com</span>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                            Connect any domain
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">Everything You Need to Succeed</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                "icon": Box,
                                "title": "Unlimited Products",
                                "description": "Add as many products as you want with no restrictions or hidden fees",
                                "color": "bg-green-100",
                                "iconColor": "text-green-600"
                            },
                            {
                                "icon": Globe,
                                "title": "Custom Domain",
                                "description": "Your own branded web address for a professional appearance",
                                "color": "bg-blue-100",
                                "iconColor": "text-blue-600"
                            },
                            {
                                "icon": CreditCard,
                                "title": "Payment Gateway",
                                "description": "Secure integrated payment processing for all transactions",
                                "color": "bg-green-100",
                                "iconColor": "text-green-600"
                            },
                            {
                                "icon": DollarSign,
                                "title": "One time Payment",
                                "description": "Lifetime access with a single payment, no recurring fees",
                                "color": "bg-green-100",
                                "iconColor": "text-green-600"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white p-7 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 flex flex-col"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-5 ${feature.color} ${feature.iconColor} group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 flex-grow">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-xl group"
                    >
                        Create My Ecommerce Store
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="mt-4 text-gray-500 text-sm">Free 3-day trial • No credit card required</p>
                </div>
            </div>
        </section>
    )
}