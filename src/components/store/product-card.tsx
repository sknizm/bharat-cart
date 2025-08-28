import { ProductType } from "@/lib/types"
import { Button } from "../ui/button"
import { BoxSelect, CircleCheck, List, Option, OptionIcon, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/context/cart-context";
import { formatIndianCurrency } from "@/lib/utils";
import { useStore } from "@/lib/context/store-context";
import { useRouter } from "next/navigation";

export function ProductCard({ product, quantity }: { product: ProductType, quantity: number }) {

    const { addToCart, getQuantity } = useCart();
    const store = useStore();
    const router = useRouter();
    const imageUrl = product.images?.[0] ?? '/placeholder-product.jpg'
    const hasSale =
        product.salePrice !== undefined &&
        product.salePrice > 0 &&
        product.salePrice < product.price;

    const hasVariant = product.variant !== undefined
        && product.variant !== null
        && product.variant.length > 0;

    const goToProductPage = () => {
        router.push(`/${store.slug}/product/${product._id}`);
    }
    const addItemToCart = (_id: string, name: string, price: number) => {
        const quantity = getQuantity(_id);
        if (quantity !== 1)
            addToCart({ _id: _id, name, price, })
    }

    return (
        <div className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
            {/* Product Image Container - Perfect Square */}
            <div onClick={goToProductPage} className="relative aspect-square bg-gray-50 overflow-hidden">
                {/* Sale Badge */}
                {hasSale && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        SALE
                    </span>
                )}

                {/* Product Image using next/image */}
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder={product.images?.length > 0 ? undefined : 'empty'}
                />
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-1.5">
                <h3 onClick={goToProductPage} className="font-medium text-gray-900 truncate">
                    {product.name}
                </h3>

                {/* Price Section */}
                <div onClick={goToProductPage} className="flex items-center gap-2">
                    <p className={`text-base font-bold ${hasSale ? 'text-green-600' : 'text-gray-900'}`}>
                        ₹{formatIndianCurrency((product.salePrice || product.price).toFixed(2))}
                    </p>
                    {hasSale && (
                        <p className="text-xs text-gray-400 line-through">
                            ₹{formatIndianCurrency(product.price.toFixed(2))}
                        </p>
                    )}
                </div>

                {/* Add to Cart Button */}
                <Button
                    onClick={() => {
                       if(hasVariant){
                        goToProductPage();
                       }else{
                         const price = product.salePrice ? product.salePrice : product.price;
                        addItemToCart(product._id, product.name, price)
                       }
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                    {quantity > 0 ?
                        <> <CircleCheck className="w-4 h-4 mr-2 text-green-600" />
                            Added to Cart
                        </>

                        : <> 
                            {
                                hasVariant ?
                                    <> <List className="w-4 h-4 mr-2" />
                                        Select Options</>
                                    : <> <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart</>
                            }
                        </>}
                </Button>
            </div>
        </div>
    )
}