import AddUpdateProduct from "../AddUpdateProduct";

export default function UpdateProduct({ params }: any) {
  const { _id } = params;
  return <AddUpdateProduct _id={_id} />;
}
