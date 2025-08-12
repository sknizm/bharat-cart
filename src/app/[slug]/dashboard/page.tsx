"use client";
import BouncingDotsLoader from '@/components/ui/bounce-loader';
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
  const router = useRouter();
  router.push(`dashboard/home`)
  return (
    <BouncingDotsLoader/>
  )
}

export default Home