import AddUpdateProduct from "../AddUpdateProduct";

export default function UpdateProduct({
  params,
}: {
  params: { _id: string };
}) {
  const { _id } = params;
  return <AddUpdateProduct _id={_id} />;
}
