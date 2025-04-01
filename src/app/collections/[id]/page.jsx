"use client";
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA

const ViewDetailCollection = () => {
    const params = useParams();
    const [collection, setCollection] = useState(null);  

    useEffect(() => {
        if (params.id) {
          getDetailCollection();
        }
      }, [params.id]);

  const getDetailCollection = async () => {
    try {
      const res = await callAPI("/collections/" + params.id + "?populate=*", "GET");
      setCollection(res.data.data)
        } catch (error) {
            console.log(error)
        }
  };

  return (
    collection !== null?
    <div class="flex bg-blue-100 gap-4 items-start py-12 justify-center">
      <div class="flex w-[70vw] h-[80vh] bg-white rounded-lg shadow dark:bg-gray-800 justify-center p-10">
        <div class="overflow-hidden flex ">
            <img src={URL_SERVER + collection.attributes.image.data[0].attributes.url} alt="shopping image"
                class="h-[80vh] w-[35vw] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"/>
        </div>
        <div class="flex-auto w-[35vw] h-[35vh] p-6 ">
            <div class="flex flex-wrap">
                <h1 class="flex-auto text-2xl font-semibold dark:text-gray-50">{collection.attributes.name}</h1>
                <div class="text-2xl font-semibold text-gray-500 dark:text-gray-300">${collection.attributes.price}</div>
                <div class="flex-none w-full mt-2 text-xl font-medium text-gray-500 dark:text-gray-300">{collection.attributes.category2.data.attributes.name}</div>
            </div>
            <div class="flex my-4 text-xl font-medium">
                <button type="button"
                    class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Comming soon</button>
                <button type="button"
                    class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Remind me</button>
            </div>
            <p class="text-xl text-gray-500 dark:text-gray-300">{collection.attributes.description}</p>
        </div>
      </div>
    </div>
        :
            <div>Sản phẩm không tìm thấy</div>
  )
}

export default ViewDetailCollection;
