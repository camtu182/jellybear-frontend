import Link from "next/link"

const ShoppingCartItem = ({category, productName, unitPrice, imageUrl, amount, price, add, decrease, productId, remove, ID}) => {
    return (
        <tbody>
            <tr>
                
                <td className="py-4 ">
                {/* <Link href={"/products/" + ID}> */}
                    <div className="flex items-center">
                        <img className="h-24 w-24 mr-4" src={imageUrl} alt="Product image"/>
                        <div className="block">
                            <span className="block text-black text-xl font-bold  truncate capitalize">{productName}</span>
                            <span className="block text-gray-400 text-md font-semibold mr-3 uppercase ">{category}</span>
                        </div>
                        
                    </div>
                    {/* </Link> */}
                </td>
                
                
                <td className="py-4 text-lg text-center">${unitPrice}</td>
                <td className="py-4 ">
                    <div className="flex text-lg items-center justify-center">
                        <button onClick={()=>{decrease(productId)}} className="border rounded-md py-2 px-4 mr-2">-</button>
                        <span className="text-center w-8">{amount}</span>
                        <button onClick={()=>{add(productId)}} className="border rounded-md py-2 px-4 ml-2">+</button>
                    </div>
                </td>
                <td className="py-4 text-lg text-center ">${price}</td>
                <td className="py-4 text-lg justify-center">
                    <button onClick={()=>{remove(productId, -amount)}} className="bg-blue-200 font-medium rounded-md px-4 py-2">Delete</button>
                </td>
            </tr>
        </tbody>
    )
}
export default ShoppingCartItem;