"use client"
import React from 'react'
import { Button } from './button'
import { handleLogout } from '@/lib/queries/auth'


const Logout = () => {
    
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default Logout