"use client";
import BouncingDotsLoader from '@/components/ui/bounce-loader';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`dashboard/home`);
  }, [router]);
  return (
    <div className='flex w-full justify-center items-center'>
      <BouncingDotsLoader />
    </div>
  )
}

export default Home