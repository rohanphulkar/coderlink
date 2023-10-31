import toast from "react-hot-toast";
import { api } from "../api/api";

interface PaymentResponse {
  response: any; // Update this type to match the actual response type
}

const handlePaymentVerification = async (response: PaymentResponse) => {
  try {
    const res = await api.post("/profile/payment/confirm/", {
      response: response,
    });
    const result = await res.data;
    console.log(result);
    const status = await res.status;
    if (status === 200) {
      toast.success("Payment Successful", { id: "1" });
      window.location.href = "/user/dashboard";
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("server error", { id: "1" });
  }
};

export const showRazorpay = async (
  token: any | null,
  duration: string | "monthly"
) => {
  toast.loading("Processing Payment...", { id: "1" });
  const response = await api.post(
    "/profile/payment/",
    {
      duration: duration,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.data;
  console.log(result);
  var options = {
    key: "",
    amount: result.payment.amount,
    currency: result.payment.currency,
    name: "Coderlink",
    description: "",
    image: "/logo.png",
    order_id: result.payment.id,
    handler: function (response: PaymentResponse) {
      handlePaymentVerification(response);
    },
    prefill: {
      name: result.order.user.name,
      email: result.order.user.email,
      contact: result.order.user.phone || "",
    },
    theme: {
      color: "#3f00ff",
    },
  };
  var rzp1 = new (window as any).Razorpay(options);
  rzp1.open();
};
