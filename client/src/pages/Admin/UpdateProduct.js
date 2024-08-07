import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";

import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setName(data.products.name);
      setId(data.products._id);
      setCategory(data.products.category._id);
      setDescription(data.products.description);
      setPrice(data.products.price);
    //   setPhoto(data.products.photo.data);
      setQuantity(data.products.quantity);
    //   console.log(data.products.photo)
      setShipping(data.products.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disabled-next-line
  }, []);
  //get all categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getcategory`
      );
      if (res.data?.success) {
        setCategories(res.data?.category);

        // console.log(res.data.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("something is wrong in getting all category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo);
       
      }
      productData.append("category", category);
      productData.append("shipping", shipping);

      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
   
      if (res.data?.success) {
        toast.success("Product Updated successfully");
        navigate("/dashboard/admin/products");
       
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
     
    }
  };
 ///delete a product

 const handleDelete=async()=>{
try {
    let answer=window.prompt('Are You Sure Want To delete this PRODUCT ?')
    if(!answer) return;
    const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
    toast.success('product deleted successfully')
    navigate("/dashboard/admin/products");
} catch (error) {
    console.log(error)
    toast.error("something went wrong")
}
 }
  return (
    <Layout title={"Dashboard- Create Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
