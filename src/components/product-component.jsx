import Link from "next/link";
import { useAppContext } from "./context";
import { callAPI } from "@/utils/api-caller";
import { useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const ProductComponent = ({category, productName, price, imageUrl, id})=>{
  const {setShoppingCart} = useAppContext()
  const [showAlert, setshowAlert] = useState(false)
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
    return(
        <div className="w-72  bg-white shadow-md rounded-md duration-500 hover:shadow-xl">
          
            <div className="overflow-hidden">
            <Link href={"/products/" + id}>
            <img src={URL_SERVER + imageUrl}
              alt="Product" className=" w-65 object-cover scale-75 object-center rounded-md hover:scale-100 duration-500" /></Link>
            </div>
            <div className="px-4 w-72 rounded-b-md block overflow-hidden">
              <div className="flex">
                <div className="block w-full overflow-hidden">
                  <span className="text-gray-400 text-xs mr-3 uppercase ">{category}</span>
                  <p className="text-black text-lg font-bold  truncate block capitalize">{productName}</p>
                </div>
                <div className="bg-slate-500 text-2xl font-semibold text-white rounded-full flex w-20 justify-center items-center">
                  <p >${price}</p>

                 </div>
              </div>
              <div className="flex items-center  rounded-md mb-4 mt-2 justify-between z-40">
                
                <button onClick={(e)=>{addToCart(id); e.stopPropagation()}} className="flex p-3.5 py-2 bg-blue-200 rounded-l-lg text-md font-bold text-black justify-content-center justify-items-center hover:bg-red-400 z-40" >
                <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                  fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                  <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
                  Add to cart</button >
                
                <button className="flex px-3.5 py-2 bg-blue-200 rounded-r-lg text-md font-bold text-black justify-content-center justify-items-center hover:bg-green-400" >
                <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                  fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                  <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
                  Buy now</button >
              </div>
            </div>
            {
            showAlert &&
            <div className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Success alert!</span>Thêm vào giỏ hàng thành công
              </div>
            </div>
          }
        </div>
    )
}
export default ProductComponent;