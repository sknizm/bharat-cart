import AddUpdateProduct from "../AddUpdateProduct";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UpdateProduct({ params }: any) {
  const { _id } = params;
  return <AddUpdateProduct _id={_id} />;
}
