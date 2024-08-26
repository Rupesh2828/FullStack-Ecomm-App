import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/apis/productApiSlice";
import { useFetchCategoryQuery } from "../../redux/apis/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";

const ProductUpdate = () => {
  const params = useParams();

  const { data: formdata } = useGetProductByIdQuery(params._id);

  //formdata?.image this means if we already have existing image, if we dont make the empty string
  const [image, setImage] = useState(formdata?.image || "");
  const [name, setName] = useState(formdata?.name || "");
  const [description, setDescription] = useState(formdata?.description || "");
  const [price, setPrice] = useState(formdata?.price || "");
  const [quantity, setQuantity] = useState(formdata?.quantity || "");
  const [category, setCategory] = useState(formdata?.category || "");
  const [brand, setBrand] = useState(formdata?.brand || "");
  const [stock, setStock] = useState(formdata?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoryQuery();
  const [uploadProductImage] = useUploadProductImageMutation(); //Check here once
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (formdata && formdata._id) {
      setName(formdata.name);
      setDescription(formdata.description);
      setPrice(formdata.price);
      setQuantity(formdata.quantity);
      setCategory(formdata.categories?._id);
      setBrand(formdata.brand);
      setImage(formdata.image);
    }
  }, [formdata]);

  const uploadFileHandler = async (e) => {
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formdata).unwrap();
      toast.success("Item added suceessfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Item added suceessfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("quantity", quantity);
      formdata.append("brand", brand);
      formdata.append("countInStock", stock);

      const response = await updateProduct({ productId: params._id, formdata }).unwrap();
    
    toast.success("Product successfully updated");
    navigate("/admin/allproductslist");
  } catch (error) {
    console.error("Error during product update:", error);
    toast.error("Product update failed. Please check the console for more details.");
  }
};

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.log(error);
      toast.error("Deletion failed, try again");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="string"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  value={category}
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
              >
                Update{" "}
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
              >
                Delete{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
