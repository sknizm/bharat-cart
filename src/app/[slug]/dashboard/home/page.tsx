import { Card } from '@/components/ui/card'
import { CarIcon } from 'lucide-react'
import React from 'react'


const Home = () => {
  return (
    <div className=' h-full w-full p-6 gap-2'>
      
      <Card className=' flex items-center'>
        <CarIcon/>
      </Card>
      
      <Card className=' flex items-center'>
        <Card/>
      </Card>
    </div>
  )
}

export default Home