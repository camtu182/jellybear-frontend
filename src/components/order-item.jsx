import Link from "next/link"
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA

const OrderItem = ({products, totalPrice, firstName, lastName, email, phone, address})=> {    return (
    <div className="rounded-lg shadow-md p-6 mb-4 bg-white">
        <div className="">
                <div className="flex justify-between w-full">
                    <span className="w-1/2 text-center text-2xl font-bold">Product</span>
                    <span className="w-1/6 text-center text-xl font-bold">Price</span>
                    <span className="w-1/6 text-center text-xl font-bold">Quantity</span>
                    <span className="w-1/6 text-center text-xl font-bold">Total</span>
                </div>
            </div>
            {
                products.map((product, index)=>{
                    return (
                        <div key={index + product.name} className="flex">
                            <div className="py-4 w-1/2">
                                <div className="flex items-center">
                                    <img className="h-24 w-24 mr-4" src={URL_SERVER + product.image[0].url} alt="Product image"/>
                                    <div className="block">
                                        <span className="block text-black text-xl font-bold  truncate capitalize">{product.name}</span>
                                        <span className="block text-gray-400 text-md font-semibold mr-3 uppercase ">{product.category.name}</span>
                                    </div>
                                    
                            </div>
                            </div>
                            <div className="w-1/2 flex justify-between items-center">
                                <span className="w-1/3 py-4 text-lg text-center">${product.price}</span>
                                <span className="w-1/3 py-4 text-lg text-center">{product.amount}</span>
                                <span className="w-1/3 py-4 text-lg text-center">${product.price*product.amount}</span>
                            </div>
                            
                        </div>
                    )
                })
                }
                <hr className="my-2"/>

                <div className="w-3/1 flex justify-end ">
                    <span className="py-2 text-xl font-bold text-center ">Total Cost:</span>
                    <span className="w-1/6  py-2 text-xl font-bold text-red-500 text-center"> ${totalPrice}</span>
                </div>
                
            <div className="flex w-full justify-start">
                <ul className="group relative cursor-pointer text-lg text-gray-700 md:pt-0">
                    <li className="flex items-center justify-between ">
                        <a className="menu-hover md:p-4  block duration-200  font-bold hover:text-red-500" >Shipping details</a>
                    </li>
                    
                    <li className="invisible absolute lg:w-[60vh] md:w-[80vh] transition-all duration-300  z-50 flex flex-col bg-white py-1 px-4 text-gray-800  group-hover:visible left-40 top-0"aria-labelledby="dropdownLargeButton">
                    <div className="flex lg:justify-between md:justify-start lg:w-full md:w-full">
                        <div className="text-left lg:w-full md:w-60 mr-2">
                            <label className="text-lg font-bold">First Name: </label>
                            <label className="">{firstName}</label>

                        </div>
                        <div className="text-left lg:w-full md:w-30 ml-1">
                            <label className="text-lg font-bold">Last Name: </label>
                            <label className="">{lastName}</label>

                        </div>
                    </div>
                    <div className="flex lg:justify-between md:justify-start pt-2">
                        <div className="text-left lg:w-full md:w-80 mr-2">
                            <label className="text-lg font-bold">Phone Number: </label>
                            <label className="">{phone}</label>

                        </div>
                        <div className="text-center lg:w-full md:w-60">
                            <label className="text-lg  font-bold">Address: </label>
                            <label className="">{address}</label>

                        </div>
                    </div>
                                    
                    </li>
                </ul></div>
    </div>
    )
}
export default OrderItem
