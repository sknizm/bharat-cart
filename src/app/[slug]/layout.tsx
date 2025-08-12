import NotFound from "@/components/ui/store-not-found";
import { StoreProvider } from "@/lib/context/store-context";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";

export default async function StoreLayout(
    { children, params }: { children: React.ReactNode; params: { slug: string } }
) {
    const { slug } = await params;
    const store = await getStoreDeatilsBySlug(slug);
    if (!store){
        return <NotFound/>
    }
 
    return (
        <StoreProvider store={store}>
 <div className=" min-h-screen">
            {children}
        </div>
        </StoreProvider>
       
    )
}