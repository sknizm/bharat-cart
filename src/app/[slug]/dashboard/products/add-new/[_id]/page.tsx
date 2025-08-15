import AddUpdateProduct from "../AddUpdateProduct"
type PageProps = {
  params: {
    _id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function UpdateProduct({ params }: PageProps) {
  const { _id } = params;
  return <AddUpdateProduct _id={_id} />;
}