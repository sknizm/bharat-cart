import AddUpdateProduct from "../AddUpdateProduct";

type PageProps = {
  params: {
    _id: string;
  };
};

export default function UpdateProduct({ params }: PageProps) {
  const { _id } = params;
  return <AddUpdateProduct _id={_id} />;
}
