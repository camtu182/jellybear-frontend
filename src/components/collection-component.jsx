import Link from "next/link";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const CollectionComponent = ({ category2, collectionName, price, imageUrl, id }) => {
  return (
    <div className="w-72 relative  bg-white shadow-md rounded-md duration-500 hover:shadow-xl">
      <Link href={"/collections/" + id}>
        <div className="overflow-hidden">
          <img src={URL_SERVER + imageUrl}
            alt="Collection" className=" w-65 object-cover scale-75 object-center rounded-md hover:scale-100 duration-500" />
        </div>
        <div className="px-4 w-72 rounded-b-md block overflow-hidden">
          <div className="flex">
            <div className="block w-full overflow-hidden">
              <span className="text-gray-400 text-xs mr-3 uppercase ">{category2}</span>
              <p className="text-black text-lg font-bold  truncate block capitalize">{collectionName}</p>
            </div>
            <div className="bg-slate-500 text-2xl font-semibold text-white rounded-full flex w-20 justify-center items-center">
              <p >${price}</p>

            </div>
          </div>
          <div className="flex items-center  rounded-md mb-4 mt-2 justify-between">

            <button className="flex px-3.5 py-2 bg-blue-200 rounded-r-lg text-md font-bold text-black justify-content-center justify-items-center" >
              Coming soon</button >

            <button className="flex px-3.5 py-2 bg-purple-100 rounded-r-lg text-md font-bold text-black justify-content-center justify-items-center " >
              Remind me</button >
          </div>
        </div>
      </Link>
    </div>
  )
}
export default CollectionComponent;