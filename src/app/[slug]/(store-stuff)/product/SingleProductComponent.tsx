"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingCart, Share2, CircleCheck, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductType } from '@/lib/types';
import { useCart } from '@/lib/context/cart-context';
import { copyToClipBoard, shareText } from '@/lib/utils';
import { usePathname } from 'next/navigation';


export function SingleProductComponent({ product }: { product: ProductType }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart, getQuantity } = useCart();
  const quantity = getQuantity(product._id);

  const currentUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}${usePathname()}`;

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
              <Badge variant="default" className="absolute top-2 left-2 bg-green-600">
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
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedImageIndex === index
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
            <p className=' text-left'>{product.description}</p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            {hasSale ? (
              <>
                <span className="text-2xl font-bold ">
                  ${product.salePrice?.toFixed(2)}
                </span>
                <span className="text-md text-gray-500 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
                {product.salePrice && <Badge variant="outline" className="ml-2">
                  {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                </Badge>}
              </>
            ) : (
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>



          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={() => {
              addToCart({ _id: product._id, name: product.name, price: product.price });
            }} size="lg" className="flex-1 gap-2">
              {quantity > 0 ?
                <>
                  <CircleCheck className=' w-5 h-5 text-green-600' />
                  Added to Cart
                </>
                : <><ShoppingCart className="w-5 h-5" />
                  Add to Cart</>}
            </Button>
            <Button onClick={() => copyToClipBoard(currentUrl)} variant="outline" size="icon">
              <Copy className="w-5 h-5" />
            </Button>
            <Button onClick={()=>shareText(currentUrl)} variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <Separator />

        </div>
      </div>
    </div>
  );
}