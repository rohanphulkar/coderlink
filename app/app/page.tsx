"use client";
import Loader from "@/components/Loader/Loader";
import { api } from "@/components/api/api";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { VscSend } from "react-icons/vsc";

const page: React.FC = () => {
  const token = Cookies.get("token");
  const [chats, setChats] = useState<[]>([]);
  const [chatItems, setChatItems] = useState<[]>([]);
  const searchParams = useSearchParams();
  const chatQuery = searchParams.get("chat");
  const router = useRouter();

  const fetchChats = async () => {
    try {
      const response = await api.get(`/chat/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = await response.status;
      const result = await response.data;
      if (status === 200) {
        setChats(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  const fetchChatItems = async (query: string) => {
    try {
      const response = await api.get(`/chat/?chat=${query || ""}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = await response.status;
      const result = await response.data;
      if (status === 200) {
        setChatItems(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Processing, Please Wait...", { id: "1" });
    const { chat }: any = e.target;
    try {
      const response = await api.post(
        `/chat/?chat=${chatQuery || ""}`,
        {
          prompt: chat.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = response.status;
      const result = response.data;
      if (status === 200) {
        if (!chatQuery) {
          router.push(`/app/?chat=${result.chat}`);
        }
        fetchChatItems(result.chat);
        toast.dismiss();
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Your plan has expired, please upgrade.");
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    }
    chat.value = "";
  };

  useEffect(() => {
    fetchChats();
    if (chatQuery) {
      fetchChatItems(chatQuery);
    }
  }, [chatQuery]);
  return (
    <div>
      {/* Content */}
      <div className="h-[38rem] md:h-[42rem] flex flex-col pb-6 relative">
        <div className="flex flex-col justify-between h-full">
          <div className="max-w-5xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-gray-800 sm:text-4xl">
              Welcome to AI Content Creation
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Ready to experience the power of AI content creation? Enter your
              prompt below:
            </p>
            <div className="mt-6 h-[25rem] md:h-[32rem] overflow-y-auto">
              {chatItems.length > 0
                ? chatItems?.map(
                    (chat: any) =>
                      chat.output && (
                        <div
                          key={chat?.id}
                          className="p-5  w-full mb-3 text-base bg-white text-left border rounded-lg my-2 border-gray-200"
                        >
                          <p className="text-gray-700">{chat?.output}</p>
                        </div>
                      )
                  )
                : null}
            </div>
          </div>
          {/* Search */}
          <div className="mt-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-4 my-1 mr-auto">
              <button
                type="button"
                data-hs-overlay="#docs-sidebar"
                aria-controls="docs-sidebar"
                aria-label="Toggle navigation"
                className="border border-gray-300 text-gray-600 rounded-full flex items-center px-4 py-1"
              >
                <HiOutlineMenuAlt3 />
                <span>{"All Chats"}</span>
              </button>
            </div>
            <div className="relative">
              <form method="POST" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="chat"
                  id="chat"
                  className="p-4 block w-full border border-gray-300 rounded-full text-sm focus:ring-0 outline-none"
                  placeholder="Ask me anything..."
                />
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  <button
                    type="submit"
                    className="inline-flex flex-shrink-0 justify-center items-center h-10 w-10 bg-blue-500 rounded-full text-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all "
                  >
                    <VscSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* End Search */}
        </div>
      </div>
      {/* End Content */}

      {/* Sidebar */}

      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y"
      >
        <div className="px-6">
          <p className="flex-none text-xl font-semibold">All Chats</p>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {chats?.map((chat: any) => (
              <li>
                <Link href={`/app/?chat=${chat?.id}`}>
                  <button
                    data-hs-overlay="#docs-sidebar"
                    type="button"
                    className="flex w-full items-center gap-x-3.5 py-2 px-2.5 bg-gray-50 text-sm text-slate-700 rounded-md hover:bg-gray-100 capitalize"
                  >
                    {chat?.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar End */}
    </div>
  );
};

export default page;
