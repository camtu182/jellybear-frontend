"use client";
import { useAppContext } from "@/components/context";
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ViewDetailProduct = () => {
  const params = useParams();
  const { setShoppingCart } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      const res = await callAPI("/products/" + params.id + "?populate=*", "GET");
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount: 1,
      });
      setShoppingCart(res.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return product !== null ? (
    <div className="flex justify-center bg-blue-100 lg:pt-30 md:pt-40 "> {/* Thêm margin-top ở đây */}
      <div className="bg-slate-200 lg:w-[60vw] md:w-[80vw] w-full rounded-lg shadow-md my-40">
        <div className="flex flex-col lg:flex-row bg-white">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={URL_SERVER + product.attributes.image.data[0].attributes.url}
              alt="Product Image"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Product Information */}
          <div className="w-full lg:w-1/2 p-6">
            <h1 className="text-3xl font-extrabold mb-4">{product.attributes.name}</h1>
            <div className="bg-slate-500 text-2xl font-semibold text-white rounded-full flex w-20 justify-center items-center mb-4">
              <p>${product.attributes.price}</p>
            </div>
            <div className="text-xl font-medium text-gray-600 mb-2">
              <span className="font-bold">Category: </span>
              {product.attributes.category.data.attributes.name}
            </div>
            <div className="text-xl font-medium text-gray-600 mb-2">
              <span className="font-bold">Sold: </span>
              {product.attributes.sold}
            </div>
            <p className="text-gray-700 mb-4">{product.attributes.description}</p>
          </div>
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <div>
            <span className="font-medium">Success!</span> Product added to cart.
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center py-10 text-lg font-semibold">
      Product not found.
    </div>
  );
};

export default ViewDetailProduct;
