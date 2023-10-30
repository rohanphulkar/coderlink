"use client";
import { api } from "@/components/api/api";
import SectionTitle from "@/components/common/SectionTitle";
import { format } from "date-fns";
import Cookies from "js-cookie";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserDetails {
  name: string;
  email: string;
}

interface UserProfile {
  user: UserDetails;
  plan_validity: string;
  is_pro: boolean;
}

interface Order {
  id: number;
  order_id: string;
  amount: number;
  status: string;
  payment_id: string;
}

const Page: React.FC = () => {
  const [userProfile, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const currentDate = new Date().toISOString().slice(0, 10);
  const token = Cookies.get("token");

  const getUser = async () => {
    try {
      const response = await api.get("/profile/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };

  const getOrders = async () => {
    try {
      const response = await api.get("/profile/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setOrders(response.data);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };

  useEffect(() => {
    getUser();
    getOrders();
  }, []);

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex-1">
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <SectionTitle title="Dashboard" />
          </div>
        </div>

        <div className="mt-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl transition">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow ml-5">
                    <h3 className="font-medium text-lg text-gray-800">Name</h3>
                    <p className="text-gray-600 text-xl font-bold">
                      {userProfile?.user.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white border shadow-sm rounded-xl transition">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow ml-5">
                    <h3 className="font-medium text-lg text-gray-800">
                      Email Address
                    </h3>
                    <p className="text-gray-600 text-xl font-bold">
                      {userProfile?.user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white border shadow-sm rounded-xl transition">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow ml-5">
                    <h3 className="font-medium text-lg text-gray-800">
                      Plan Validity
                    </h3>
                    <p className="text-gray-600 text-xl font-bold">
                      {currentDate >= userProfile?.plan_validity
                        ? format(
                            new Date(userProfile?.plan_validity),
                            "dd MMMM, yyyy"
                          )
                        : "Expired"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!userProfile?.is_pro && (
          <div className="bg-gradient-to-r from-primary to-blue-500 max-w-6xl mx-auto">
            <div className="px-4 py-4 sm:px-6 lg:px-8 mx-auto">
              <div className="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
                <div className="text-center md:text-left">
                  <p className="mt-1 text-white font-bold text-2xl">
                    Upgrade your plan
                  </p>
                </div>
                <div className="mt-3 text-center md:text-left md:flex md:justify-end md:items-center">
                  <button className="py-3 px-6 inline-flex justify-center items-center gap-2 rounded-full font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-sm">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Purchases
              </h1>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        S. No.
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-lg font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-lg font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-lg font-semibold text-gray-900"
                      >
                        Payment ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders
                      ?.filter((order) => order.status !== "pending")
                      .map((order, index) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap font-semibold py-4 px-3 text-lg text-gray-500">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap font-semibold py-4 px-3 text-lg text-gray-500">
                            {order.order_id}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-lg text-gray-500">
                            &#8377;{order.amount}
                          </td>
                          <td
                            className={`whitespace-nowrap capitalize py-4 px-3 text-lg text-gray-500`}
                          >
                            <span
                              className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
                                order.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-lg text-gray-500">
                            {order.payment_id}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
