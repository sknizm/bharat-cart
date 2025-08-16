import NotFound from "@/components/ui/store-not-found";
import { StoreProvider } from "@/lib/context/store-context";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";

export default async function StoreLayout(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { children, params }: { children: React.ReactNode; params: any }
) {
  const { slug } = params; // ✅ Await the params
  const store = await getStoreDeatilsBySlug(slug);

  if (!store) {
    return <NotFound />;
  }

  return (
    <StoreProvider store={store}>
      <div className="min-h-screen">
        {children}
      </div>
    </StoreProvider>
  );
}
