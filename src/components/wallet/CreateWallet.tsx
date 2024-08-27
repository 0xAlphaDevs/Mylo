"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

const CreateWallet = () => {
  const { toast } = useToast()
  return (
    <div>
      <Button
        className='rounded-[10px] font-semibold'
        onClick={() => {
          toast({
            variant: "success",
            description: "Wallet created successfully!",
          })
        }}>
        + Create Wallet
      </Button>
    </div>
  )
}

export default CreateWallet