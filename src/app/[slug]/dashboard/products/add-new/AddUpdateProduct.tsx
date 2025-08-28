"use client"
import ImageBucket from '@/components/dashboard/image-bucket'
import BouncingDotsLoader from '@/components/ui/bounce-loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/lib/context/store-context'
import { CategoryType, VariantType } from '@/lib/types'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AddUpdateProduct = ({ _id }: { _id?: string }) => {
  const store = useStore();
  const router = useRouter();
  const isEditMode = !!_id;
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [newCategoryLoading, setNewCategoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);


  // variants
  const [variant, setVariant] = useState<VariantType[]>([]);
  const [variantType, setVariantType] = useState("");
  const [variantValue, setVariantValue] = useState("");
  const [variantPrice, setVariantPrice] = useState(0);

  // --- add/remove variant ---
  const addVariant = () => {
    if (!variantType || !variantValue) {
      toast.error("Please enter variant type and value");
      return;
    }
    setVariant(prev => [...prev, { type: variantType, value: variantValue, price: variantPrice }]);
    setVariantType("");
    setVariantValue("");
    setVariantPrice(0);
  }

  const removeVariant = (i: number) => {
    setVariant(prev => prev.filter((_, idx) => idx !== i));
  }


  const handleImageDelete = (url: string) => {
    setImages(prev => prev.filter((i) => i !== url))
  }

  const toogleCategory = (id: string) => {
    setSelectedCategories((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id])
  }

  useEffect(() => {

    const getProductDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/store/${store.slug}/product/${_id}`);
        if (!res.ok) {
          toast.error("Failed to load Product data")
        } else {
          const data = await res.json();

          console.log("VARIANT", data)
          setImages(data.product.images);
          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setSalePrice(data.product.salePrice);
          setSelectedCategories(data.product.categories);
          setVariant(data.product.variant.flat())
          setIsProductLoading(false);
        }
      } catch (error) {
        console.log(error)
        toast.error("Internal server error")
      }finally{
        setIsLoading(false);
      }
    }

    setIsProductLoading(true);
    getAllCategory();
    if (isEditMode) {
      getProductDetails()
    } else {
      setIsProductLoading(false);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, _id])


  const addNewCategory = async () => {
    try {
      setNewCategoryLoading(true);
        setIsUpdating(true);
      if (!newCategory) {
        toast.error("Please add a Category Name")
      } else {
        const res = await fetch(`/api/store/${store.slug}/category`, {
          headers: {
            "Content-Type": "application:json"
          },
          method: "POST",
          body: JSON.stringify({ name: newCategory.trim() })
        })
        if (!res.ok) {
          toast.error("Failed to add new category")
        } else {
          toast.success("Category added successfully");
          setNewCategory("");
          getAllCategory()
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setNewCategoryLoading(false);
        setIsUpdating(false);
    }
  }

  const getAllCategory = async () => {
    try {
      setCategoryLoading(true)
      const res = await fetch(`/api/store/${store.slug}/category`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();
      setCategories(data.categoryDoc);
    } catch (error) {
      console.log(error);
      toast.error("Failed to get all categories");
    } finally {
      setCategoryLoading(false)
    }
  }

  const handleAddProduct = async () => {
    try {
        setIsUpdating(true);
      const res = await fetch(
        isEditMode ? `/api/store/${store.slug}/product/${_id}` : `/api/store/${store.slug}/product`
        , {
          headers: {
            "Content-Type": "application/json"
          },
          method: isEditMode ? "PUT" : "POST",
          body: JSON.stringify({
            name: name,
            description: description,
            images: images,
            price: price,
            salePrice: salePrice,
            categories: selectedCategories,
            variant:variant
          })
        });

      if (!res.ok) {
        toast.error(isEditMode ? "Failed to update product" : "Failed to create Product");
      } else {
        toast.success(isEditMode ? "Product updated successfully" : "Product added successfully");
        router.push(`/${store.slug}/dashboard/products`)
      }
    } catch (error) {
      console.log(error);
      toast.error(isEditMode ? "Failed to update product" : "Failed to create Product");
    } finally {
        setIsUpdating(false);
    }
  }


  return (
    <div className=' w-full p-4'>
      {
        isProductLoading || isLoading ? <BouncingDotsLoader /> : <>
          <Card>
            <CardHeader>
              <CardTitle className=' text-lg bold'>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Images */}
              <div className='flex flex-col '>
                <Label className='block font-medium mb-1'>Images</Label>
                <ImageBucket onSelect={(url) => { setImages((prev) => [...prev, url]) }} />

                {images.length > 0 && (
                  <div className=' flex gap-2 mt-2'>
                    {images.map((url, i) => (

                      <div key={i} className=' relative w-40 h-40 rounded-md overflow-hidden'>
                        <Image src={url} alt='product' fill objectFit='object-cover' />
                        <Button
                          variant={'outline'}
                          className=' absolute top-2 right-2'
                          onClick={() => handleImageDelete(url)}>
                          <Trash2 className='w-4 h-4 text-red-600' />
                        </Button>
                      </div>
                    ))}

                  </div>
                )}
              </div>

              {/* Name */}
              <div className=' mt-12'>
                <Label className='block font-medium mb-1'>Name</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Product Name'
                  value={name}
                  required
                />
              </div>

              {/* Description */}
              <div className=' mt-4'>
                <Label className='block font-medium mb-1'>Description</Label>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Product Description'
                  value={description}
                />
              </div>


              {/* Price and Sale Price */}
              <div className=' mt-12 flex  gap-2 '>
                <div className=' w-full'>
                  <Label className='block font-medium mb-1'>Price</Label>
                  <Input
                    className=' w-full'
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder='Product Price'
                    value={price}
                    required
                  />
                </div>
                <div className=' w-full'>
                  <Label className='block font-medium mb-1'>Sale Price</Label>
                  <Input
                    className=' w-full'
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    placeholder='Sale Price / Offer Price'
                    value={salePrice}
                  />
                </div>
              </div>

              {/* Category */}
              <div className=' mt-12'>
                <Label className=' font-medium block mb-4'>Select Category</Label>
                <div className=' grid grid-cols-3 gap-2'>
                  {categories.map((cat) => (
                    <Label key={cat._id} className='flex items-center justify-start gap-2'>
                      <Input
                        type='checkbox'
                        className=' w-4 h-4'
                        checked={selectedCategories.includes(cat._id)}
                        onChange={() => toogleCategory(cat._id)}
                      />
                      {cat.name}
                    </Label>

                  ))}


                </div>
                <div className='mt-4 w-full flex items-center gap-2 justify-start'>
                  <Input
                    className=' w-xl'
                    placeholder='Add new Category'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button
                    disabled={newCategoryLoading}
                    onClick={() => addNewCategory()
                    }
                  >{
                      newCategoryLoading ?
                        <>
                          <Loader2 className='w-4 h-4 animate-spin mr-1' /> Adding Category
                        </>
                        :
                        "Add Category"}</Button>
                </div>
              </div>

              {/* Variants */}
              <div className='mt-12'>
                <Label className='block font-medium mb-2'>Variants</Label>
                <div className='flex gap-2 mb-4'>
                  <Input
                    placeholder='Type (e.g. Size, Color)'
                    value={variantType}
                    onChange={(e) => setVariantType(e.target.value)}
                  />
                  <Input
                    placeholder='Value (e.g. XL, Red)'
                    value={variantValue}
                    onChange={(e) => setVariantValue(e.target.value)}
                  />
                  <Input
                    type='number'
                    placeholder='Price (optional)'
                    value={variantPrice}
                    onChange={(e) => setVariantPrice(Number(e.target.value))}
                  />
                  <Button onClick={addVariant}>Add</Button>
                </div>

                {variant.length > 0 && (
                  <div className='flex flex-col gap-2'>
                    {variant.map((v, i) => (
                      <div key={i} className='flex justify-between items-center border p-2 rounded'>
                        <span>{v.type}: {v.value} — {v.price}</span>
                        <Button size='sm' variant='destructive' onClick={() => removeVariant(i)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <CardFooter>

              </CardFooter>
            </CardContent>
          </Card>
          <div className=' mt-2 w-full flex items-center justify-end gap-4'>
            <Button
              disabled={isUpdating || categoryLoading}
              onClick={() => {
                router.push(`/${store.slug}/dashboard/products`)
              }}
              variant={'outline'}
              className=' border-2 border-black'
            >Cancel</Button>

            <Button
              disabled={isUpdating || categoryLoading}
              onClick={handleAddProduct}>
              {isUpdating ? <>
                <Loader2 className=' w-4 h-4 animate-spin mr-2' />
                {isEditMode ? "Updating Product" : "Creating Product"}
              </> : <>{isEditMode ? "Update Product" : "Add Product"}</>}
            </Button>

          </div>
        </>
      }
    </div>
  )
}

export default AddUpdateProduct