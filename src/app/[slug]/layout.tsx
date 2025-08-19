import NotFound from "@/components/ui/store-not-found";
import { CartProvider } from "@/lib/context/cart-context";
import { StoreProvider } from "@/lib/context/store-context";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";

export default async function StoreLayout(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { children, params }: { children: React.ReactNode; params: any }
) {
  const { slug } = params; 
  const store = await getStoreDeatilsBySlug(slug);
  if (!store) {
    return <NotFound />;
  }

  return (
    <CartProvider>
      <StoreProvider store={store}>
        <div className="min-h-screen">
          {children}
        </div>
      </StoreProvider>
    </CartProvider>

  );
}
