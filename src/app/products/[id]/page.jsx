"use client";
import { useAppContext } from "@/components/context";
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA

const ViewDetailProduct = (id) => {
    const params = useParams();
    const {setShoppingCart} = useAppContext()
    const [showAlert, setshowAlert] = useState(false)
    const [product, setProduct] = useState(null);  
    useEffect(()=>{
      getDetailProduct()
  },[])
  const getDetailProduct = async () => {
    try {
      const res = await callAPI("/products/" + params.id + "?populate=*", "GET")
      console.log(res)
      setProduct(res.data.data)
        } catch (error) {
            console.log(error)
        }
  };
    
    const addToCart = async(productId) =>{
      try {
        const res =  await callAPI("/add-to-shopping-cart","POST", {productId, amount: 1})
        console.log(res)
        setShoppingCart(res.data)
            setshowAlert(true)
            setTimeout(()=>{setshowAlert(false)}, 2000)
    } catch (error) {
  
    }
    }
  return (
    product !== null?
    <div className="flex h-screen bg-blue-100 items-center justify-center ">
      <div className="bg-slate-200 flex w-[70vw] h-[70vh] rounded-lg shadow  justify-center mt-14">
        <div className="overflow-hidden flex bg-white ">
            <img src={URL_SERVER + product.attributes.image.data[0].attributes.url} alt="shopping image"
                className="h-200 scale-90 object-cover rounded-lg ring-gray-200 ring-1"/>
        </div>
        <div className="flex-auto w-[35vw] h-full p-6  bg-white">
            <div className="flex flex-wrap mt-10">
                <h1 className="flex-auto text-5xl font-extrabold dark:text-gray-50">{product.attributes.name}</h1>
                <div className="bg-slate-500 text-4xl p-5 font-semibold text-white rounded-3xl flex w-20 justify-center items-center">
                  <p >${product.attributes.price}</p>

                 </div>
                <div className="flex-none w-full mt-2 text-xl font-medium uppercase text-gray-500 dark:text-gray-300">
                  <span className="text-black font-bold uppercase">Category: </span>
                  <span>{product.attributes.category.data.attributes.name}</span>
                </div>
                <div className="flex-none w-full mt-2 text-xl font-medium uppercase text-gray-500 dark:text-gray-300">
                <span className="text-black font-bold">Sold: </span>
                <span>{product.attributes.sold}</span>
                </div>

            </div>
            <p className="text-xl text-gray-500 dark:text-gray-300 py-5">{product.attributes.description}</p>

            {/* <div className="flex items-center text-4xl rounded-md mb-4 mt-2 text-center justify-between z-40">
                
                <button onClick={(e)=>{addToCart(id); e.stopPropagation()}} className="flex p-5 py-2 bg-blue-200 rounded-l-lg text-md font-bold text-black justify-content-center justify-items-center hover:bg-red-400 z-40" >
                <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                  fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                  <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
                  Add to cart</button >
                
                <button className="flex px-3.5 py-2 bg-blue-200 rounded-r-lg text-md font-bold text-black justify-content-center justify-items-center hover:bg-green-400" >
                <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                  fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                  <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
                  Buy now</button >
              </div> */}
        </div>
      </div>
    </div>
        :
            <div>Sản phẩm không tìm thấy</div>
  )
}

export default ViewDetailProduct;
