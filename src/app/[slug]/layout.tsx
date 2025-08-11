import NotFound from "@/components/ui/store-not-found";
import { doesStoreExist } from "@/lib/queries/store";

export default async function StoreLayout(
    { children, params }: { children: React.ReactNode; params: { slug: string } }
) {
    const { slug } = await params;

    if (!await doesStoreExist(slug)) {
        return <NotFound/>
    }

    return (
        <div className=" min-h-screen">
            {children}
        </div>
    )
}