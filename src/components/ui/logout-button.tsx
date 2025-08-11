"use client"
import React from 'react'
import { Button } from './button'
import { handleLogout } from '@/lib/queries/auth'


const Logout = () => {
    
  return (
    <Button variant={'destructive'} onClick={handleLogout}>Logout</Button>
  )
}

export default Logout