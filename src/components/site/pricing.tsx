"use client";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PricingProps {
    isWhatsApp: boolean,
    isMembershipInactive: boolean
}

export default function Pricing2({ isWhatsApp, isMembershipInactive = false }: PricingProps) {
    const router = useRouter();
    const handleCtaClick = (planName: string) => {
        if (isWhatsApp) {
            const message = `Hi, I want to get the ${planName} plan. Please assist me.`
            const whatsappUrl = `https://wa.me/918455838503?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, '_blank')
        } else {
            router.push('/signup')
        }
    }

    const plans = [
        {
            name: "Montly Plan",
            price: "₹99",
            originalPrice: "₹199",
            description: "Get Started with Monthly Plan",
            features: [
                "Unlimited products & categories",
                "Secure payment gateway integration",
                "Custom domain support",
                "Mobile-responsive store design",
                "Order management system",
                "24/7 customer support",
                "All future updates included"
            ],
            cta: "Get Monthly Plan",
            popular: false,
        },
        {
            name: "Lifetime Access",
            price: "₹499",
            originalPrice: "₹1499",
            description: "One-time payment for unlimited access forever",
            features: [
                "Unlimited products & categories",
                "Secure payment gateway integration",
                "Custom domain support",
                "Mobile-responsive store design",
                "Order management system",
                "24/7 customer support",
                "All future updates included"
            ],
            cta: "Get Lifetime Access",
            popular: true,
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-green-50/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header Section */}
                {isMembershipInactive ? (
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Membership Update
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                            Subscription <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">Ended</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            This store&apos;s membership has expired. Please renew to continue selling online.
                        </p>
                    </div>
                ) : (
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                            <Sparkles className="w-4 h-4 mr-2" />
                            One-time payment
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
                            Simple,
                            <span className="relative">
                                <span className="relative z-10"> Transparent Pricing</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200/60 -z-10"></span>
                            </span>
                            {' '}
                        </h2>
                        <p className="md:text-xl text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            No <strong className="font-semibold text-green-700">hidden fees</strong>. Start your e-commerce store with a single payment.
                        </p>
                    </div>


                )}

                {/* Pricing Card */}
                <div className="max-w-3xl flex-col md:flex-row flex gap-2 items-center md:items-start justify-center mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="relative p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-green-300"
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600">{plan.description}</p>
                            </div>

                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {plan.price}
                                    </span>
                                    {plan.originalPrice && (
                                        <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                                    )}
                                </div>
                                {plan.originalPrice && (
                                    <span className="inline-block mt-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                        Save 67%
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleCtaClick(plan.name)}
                                className="w-full py-4 px-6 rounded-xl font-medium bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {plan.cta}
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Not sure if this is right for you?</p>
                    <button
                        onClick={() => {
                            window.open(`https://wa.me/918455838503?text=${encodeURIComponent("Hi, I need help choosing a plan")}`, '_blank')
                        }}
                        className="text-green-600 font-medium hover:underline inline-flex items-center"
                    >
                        Contact our team <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}