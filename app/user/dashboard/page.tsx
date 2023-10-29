import { api } from "@/components/api/api";
import SectionTitle from "@/components/common/SectionTitle";
import { format } from "date-fns";
import { cookies } from "next/headers";
import React from "react";

const cookieStore = cookies();
const token = cookieStore.get("token")?.value;

const getUserProfile = async () => {
  try {
    const response = await api.get("/profile/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      return result;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};

const getuserOrders = async () => {
  try {
    const response = await api.get("/profile/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.data;
    const status = await response.status;

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
  const userProfile = await getUserProfile();
  const orders = await getuserOrders();

  return (
    <div>
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <SectionTitle title="Dashboard" />
          </div>
        </div>

        <div className="mt-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card */}
            <div className="flex flex-col bg-white border shadow-sm rounded-xl  transition">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow ml-5">
                    <h3 className="font-medium text-lg text-gray-800">Name</h3>
                    <p className="text-gray-600 text-xl font-bold">
                      {userProfile?.user?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Card */}
            {/* Card */}
            <div className="flex flex-col bg-white border shadow-sm rounded-xl  transition">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow ml-5">
                    <h3 className="font-medium text-lg text-gray-800">
                      Email Address
                    </h3>
                    <p className="text-gray-600 text-xl font-bold">
                      {userProfile?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Card */}
            {/* Card */}
            <div className="flex flex-col bg-white border shadow-sm rounded-xl  transition">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow ml-5">
                    <h3 className="font-medium text-lg text-gray-800">
                      Plan Validity
                    </h3>
                    <p className="text-gray-600 text-xl font-bold">
                      {format(
                        new Date(userProfile?.plan_validity),
                        "dd MMMM, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Card */}
          </div>
          {/* End Grid */}
        </div>

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
                      ?.filter((order: any) => order?.status !== "pending")
                      ?.map((order: any, index: number) => (
                        <tr key={order?.id}>
                          <td className="whitespace-nowrap font-semibold py-4 px-3 text-lg text-gray-500">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap font-semibold py-4 px-3 text-lg text-gray-500">
                            {order?.order_id}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-lg text-gray-500">
                            &#8377;{order?.amount}
                          </td>
                          <td
                            className={`whitespace-nowrap capitalize py-4 px-3 text-lg text-gray-50`}
                          >
                            <span
                              className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
                                order?.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              } `}
                            >
                              {order?.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-lg text-gray-500">
                            {order?.payment_id}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
