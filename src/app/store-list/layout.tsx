import { getCurrentUser } from "@/lib/queries/user";
import { redirect } from "next/navigation";


export default async function StoreListLayout( { children,
}: {
  children: React.ReactNode;
}){

  const user = await getCurrentUser();
  if(!user){
    redirect('/signin')
  }

  return(
    <div className=" min-h-screen bg-green-50"
    >
      {children}
    </div>
  )
}