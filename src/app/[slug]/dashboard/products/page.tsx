"use client"
import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog'
import BouncingDotsLoader from '@/components/ui/bounce-loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useStore } from '@/lib/context/store-context'
import { ProductType } from '@/lib/types'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Box, Eye, Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const Products = () => {
  const router = useRouter();
  const store = useStore();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productDeleteId, setProductDeleteId] = useState<string | null>(null)

  useEffect(() => {
    getAllProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/store/${store.slug}/product/${productDeleteId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Product deleted successfully")
        getAllProducts()
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.log(error);

    } finally {
      setProductDeleteId(null)
    }
  }
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/store/${store.slug}/product`, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        toast.error("Failed to get products")
      } else {
        const data = await res.json();
        setProducts(data.products);
      }

    } catch (error) {
      console.log(error);
      toast.error("Internal server error")
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <div className="max-w-6xl mx-auto md:p-4 space-y-6">
      <Card>
        <CardHeader className="px-6 py-5 border-b">
          <div className='flex items-center justify-between'>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Box className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-800">
                  All Products
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Add and Update all your products here
                </CardDescription>
              </div>
            </div>
            <Button disabled={!!productDeleteId} onClick={() => router.push(`/${store.slug}/dashboard/products/add-new`)}>
              <Plus className=' w-4 h-4 mr-2' />
              Add Product
            </Button>
          </div>
        </CardHeader>
        {
          isLoading ?
            <BouncingDotsLoader />
            :
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map(product => (
                        <TableRow key={product._id}>
                          <TableCell>
                            {product.images.length > 0 ? (
                              <div className="relative h-12 w-12">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-xs text-center text-gray-500">No <br></br> Image</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {product.salePrice && product.salePrice > 0 ? (
                                <>
                                  <span className="text-gray-500 line-through">
                                    ${Number(product.price).toFixed(2)}
                                  </span>
                                  <span className="font-medium">
                                    ${Number(product.salePrice).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span> ${Number(product.price).toFixed(2)}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  disabled={!!productDeleteId}
                                  onClick={() => {
                                    router.push(`/${store.slug}/product/${product._id}`)
                                  }}
                                  variant={'outline'}
                                  className=' w-8 h-8 p-1 mr-2'
                                > <Eye className='' />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Product</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  disabled={!!productDeleteId}
                                  onClick={() => {
                                    router.push(`/${store.slug}/dashboard/products/add-new/${product._id}`)
                                  }}
                                  variant={'outline'}
                                  className=' w-8 h-8 p-1 mr-2'
                                > <Pencil className=' text-blue-600' />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Product</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip >
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    setProductDeleteId(product._id);
                                    setDeleteDialogOpen(true);
                                  }}
                                  disabled={!!productDeleteId}
                                  variant={'outline'}
                                  className=' w-8 h-8 p-1 mr-2 '
                                >

                                  {
                                    productDeleteId === product._id ? <Loader2 className=' w-4 h-4 animate-spin' />
                                      :
                                      <Trash2 className=' text-red-600' />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent >
                                <p>Delete Product</p>
                              </TooltipContent>
                            </Tooltip>




                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
        }
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product and
              remove it from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setProductDeleteId(null)}
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Products