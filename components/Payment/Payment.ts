import toast from "react-hot-toast";
import { api } from "../api/api";

interface PaymentResponse {
  response: any; // Update this type to match the actual response type
}

const handlePaymentVerification = async (response: PaymentResponse) => {
  try {
    const res = await api.post("/api/payment-confirm/", {
      response: response,
    });
    const result = await res.data;
    console.log(result);
    const status = await res.status;
    if (status === 200) {
      toast.success("payment successful", { id: "1" });
      window.location.href = "/dashboard";
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("server error", { id: "1" });
  }
};

export const showRazorpay = async (
  token: string | null,
  duration: string | "monthly"
) => {
  if (!token) {
    toast.error("Please login first", { id: "1" });
    window.location.href = "/login";
  }
  const response = await api.post(
    "/api/profile/payment/",
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
  var options = {
    key: "",
    amount: result.payment.amount,
    currency: result.payment.currency,
    name: "My Trip My Ticket",
    description: "Book your travel now",
    image: "/logo.png",
    order_id: result.payment.id,
    handler: function (response: PaymentResponse) {
      handlePaymentVerification(response);
    },
    prefill: {
      name: result.user.name,
      email: result.user.email,
      contact: result.user.phone,
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new (window as any).Razorpay(options);
  rzp1.open();
};
