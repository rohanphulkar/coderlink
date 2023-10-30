import { api } from "@/components/api/api";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
export const revalidate = 10;
const getBlogs = async () => {
  try {
    const response = await api.get("/blog/posts/");
    const status = await response.status;
    const result = await response.data;
    if (status === 200) {
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const page: React.FC = async () => {
  const blogs = await getBlogs();
  return (
    <div>
      <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tech Talks
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Tech Trends Unveiled: Tomorrow's Innovations Today
            </p>
          </div>
          <div className="mt-12 grid gap-16 pt-12 md:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {blogs?.map((blog: any) => (
              <div
                key={blog?.id}
                className="p-10 min-h-116  w-full rounded-xl text-gray-100  bg-black/90 bg-center bg-cover transform duration-500 cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
                  rgba(0, 0, 0, 0.5)),url("${blog?.image}")`,
                }}
              >
                <h1 className="mt-5 text-4xl text-gray-100 leading-snug  min-h-33 capitalize">
                  {blog?.title}
                </h1>

                <div className="mt-16 flex justify-between ">
                  <span className="p-3 pl-0 font-bold">
                    {format(new Date(blog?.created_at), "dd MMMM, yyyy")}
                  </span>
                  <Link href={`/blog/${blog?.slug}`}>
                    <button
                      type="button"
                      className="p-3 px-5 bg-secondary rounded-md text-base  cursor-pointer  text-black "
                    >
                      Read Full Blog
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
