import { api } from "@/components/api/api";
import React from "react";

const getBlog = async (slug: any) => {
  try {
    const response = await api.get(`/blog/posts/${slug}/`);
    const status = await response.status;
    const result = await response.data;
    if (status === 200) {
      return result;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return {};
  }
};

const page = async ({ params }: { params: any }) => {
  const blog = getBlog(params.slug);

  return (
    <div>
      <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
          {/* Content */}
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold md:text-3xl">{blog?.title}</h2>
            </div>

            <img
              className="w-full object-cover rounded-xl"
              src={blog?.image}
              alt="Image Description"
            />

            <div
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
              className="text-lg text-gray-800"
            ></div>
          </div>
          {/* End Content */}
        </div>
      </div>
      {/* End Blog Article */}
    </div>
  );
};

export default page;
