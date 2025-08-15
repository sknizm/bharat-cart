import AddUpdateProduct from "../AddUpdateProduct";

export default async function UpdateProduct(
  { params }: Awaited<{ params: { _id: string } }>
) {
  const { _id } = params;
  return <AddUpdateProduct _id={_id} />;
}
