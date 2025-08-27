"use client"

import { useRef } from "react"
import { Button } from "../ui/button"
import { ProductCard } from "./product-card"
import { ProductType, CategoryType } from "@/lib/types"
import { useCart } from "@/lib/context/cart-context"

type Props = {
  products: ProductType[]
  categories: CategoryType[]
}

export function CategoryList({ products, categories }: Props) {

  const { getQuantity } = useCart();
  // Explicitly type filteredCategories
  const filteredCategories: CategoryType[] = categories.filter(cat =>
    products.some(p => p.categories.includes(cat._id))
  )

  // Refs for each category section
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScrollToCategory = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="space-y-8">
      {/* Categories Scroll */}
      <div className="relative">
        <div
          className="
            px-4 py-3 flex items-center space-x-2 
            overflow-x-auto scroll-smooth 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            whitespace-nowrap
          "
        >
          {filteredCategories.map((category, i) => (
            <Button
              key={category._id}
              variant={i === 0 ? "default" : "outline"}
              onClick={() => handleScrollToCategory(i)}
              className="
                rounded-full px-4 py-2
                transition-all duration-200
                hover:scale-105 hover:shadow-md
                active:scale-95
                focus-visible:ring-2 focus-visible:ring-offset-2
                text-sm font-medium
              "
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gradient fade effect */}
        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Category Sections */}
      <div className="space-y-12 px-4">
        {filteredCategories.map((category, i) => {
          const categoryProducts =
            products.filter(p => p.categories.includes(category._id))

          return (
            <section
              key={category._id}
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[i] = el
              }}
              className="space-y-4 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {categoryProducts.map(product => {
                  const quantity = getQuantity(product._id)
                  return (<ProductCard quantity={quantity} key={product._id} product={product} />)
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
