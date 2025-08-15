import AddUpdateProduct from "../AddUpdateProduct"

const UpdateProduct = async ({params}:{params:{_id:string}}) =>{
    const {_id} = await params;
return <AddUpdateProduct _id={_id}/>
}

export default UpdateProduct