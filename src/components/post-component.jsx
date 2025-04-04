import React from "react";
import ReactMarkdown from "react-markdown";  // Import react-markdown để xử lý Markdown
import Link from "next/link";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const PostComponent = ({ title, ID, content, date, author, postImg }) => {
  return (
    <div className="w-72 bg-white shadow-md rounded-md duration-500 hover:shadow-xl lg:scale-100 md:scale-75">
      <div className="relative w-72 h-56 overflow-hidden p-5"> {/* Giảm chiều cao ảnh */}
        <Link href={"/posts/" + ID}>
          <img
            src={URL_SERVER + postImg}
            alt="Post Image"
            className="w-full h-full object-cover rounded-md hover:scale-100 duration-500"
          />
        </Link>
        {/* Thêm thông tin Publish và Author */}
        <div className="absolute bottom-5 left-5 right-5 p-2 bg-black bg-opacity-50 text-white text-sm transition-all duration-300">
          <span>
            Published at {date} by {author}
          </span>
        </div>
      </div>
      <div className="px-5 w-72 rounded-b-md block overflow-visible">
        {/* Tiêu đề bài viết */}
        <div className="block w-full">
          <p className="text-black text-md font-bold block capitalize pb-3">
            {title}
          </p>
        </div>
        {/* Hiển thị nội dung Markdown */}
        <div className="text-sm text-gray-700 pb-5">
          {/* Hiển thị tối đa 3-4 dòng */}
          <div className="line-clamp-4 overflow-hidden">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
