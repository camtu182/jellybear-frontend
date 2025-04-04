"use client";
import { useAppContext } from "@/components/context";
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import { URL_SERVER } from "@/utils/api-caller"; // Thêm URL_SERVER nếu cần

const ViewDetailPost = () => {
  const params = useParams(); // Lấy params từ URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      if (!params.id) {
        console.error("Post ID is missing in the URL");
        return;
      }
      
      const res = await callAPI("/posts/" + params.id, "GET");

      if (res?.data?.data) {
        setPost(res.data.data); // Set post data vào state
      } else {
        console.error("Post data not found");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return post !== null ? (
    <div className="flex justify-center bg-blue-100 lg:pt-20 md:pt-40 ">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-10 mt-5">
        <div className="py-3">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-800">{post.attributes.title}</h1>
          {/* Hiển thị ngày và tác giả */}
          <p className="text-gray-500 text-sm">
            Published on {new Date(post.attributes.create_at).toLocaleDateString()} by {post.attributes.author}
          </p>
        </div>

        {/* Hiển thị ảnh bài viết */}
        {post.attributes.image && (
          <img
            src={URL_SERVER + post.attributes.image.data[0].attributes.url}
            alt="Featured image"
            className="w-full h-auto mb-8 rounded-lg"
          />
        )}

        {/* Hiển thị nội dung markdown */}
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-gray-700">
          <ReactMarkdown>{post.attributes.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-10 text-lg font-semibold text-gray-700">
      Post not found.
    </div>
  );
};

export default ViewDetailPost;
