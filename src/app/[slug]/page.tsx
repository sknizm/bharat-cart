"use client";
import { Banner } from '@/components/store/banner'
import { CategoryList } from '@/components/store/category-list'
import { Footer } from '@/components/store/footer'
import { Header } from '@/components/store/header'
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/lib/context/store-context';
import React, { useEffect, useState } from 'react'

const Store = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [storeData, setStoreData] = useState({
    name:'',
    description:'',
    logo:''
  });
  const store = useStore();

  useEffect(() => {
    getStoreData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getStoreData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/store/${store.slug}`)

      const data = await res.json();
      setProducts(data.products)
      setCategories(data.categories)
      console.log("DATA-Store", data)
      setStoreData({
        name: data.store.name,
        description: data.store.description,
        logo:data.store.logo
      })
      if (!res.ok) {
        return <div>Try Again </div>
      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);

    }
  }


  return (
    <div>
      {isLoading ?
        <div className="space-y-8 p-4">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        :
        <div className='min-h-screen w-full bg-gray-50'>
          <Header logo={storeData.logo} />
          <main className='container mx-auto px-4 py-6 space-y-6'>
            <Banner name={storeData.name} description={storeData.description}/>
            <CategoryList products={products} categories={categories} />

          </main>
          <footer>
            <Footer />
          </footer>
        </div>}
    </div>
  )
}

export default Store