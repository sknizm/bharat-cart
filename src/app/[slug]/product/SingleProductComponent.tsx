"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductType } from '@/lib/types';
import { useCart } from '@/lib/context/cart-context';


export function SingleProductComponent({ product }: {product: ProductType}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCart();

  const hasSale = product.salePrice && product.salePrice < product.price;
  const mainImage = product.images[selectedImageIndex] || '/placeholder-product.jpg';

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Sale Badge */}
            {hasSale && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Sale
              </Badge>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? 'border-primary' 
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <span className="text-sm text-gray-500">(42 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-destructive">
                  ${product.salePrice?.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
                { product.salePrice &&<Badge variant="outline" className="ml-2">
                  {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                </Badge>}
              </>
            ) : (
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Store Info */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sold by:</span>
            <span className="font-medium">{product.name}</span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {product.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <span className="sr-only">Decrease quantity</span>
                -
              </Button>
              {/* <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {setQuantity(Math.max(1, parseInt(e.target.value) || 1)}

                }
                className="w-16 text-center"
              /> */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                {/* <span className="sr-only">Increase quantity</span> */}
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={()=>{
              addToCart({_id:product._id, name:product.name, price:product.price});
            }} size="lg" className="flex-1 gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <Separator />

        </div>
      </div>
    </div>
  );
}