import { redirect } from "next/navigation"

const AdminPage = ()=>{
    redirect('customer-dashboard/account')
}

export default AdminPage