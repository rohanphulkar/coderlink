import Cookies from "js-cookie";
export const Logout = () => {
  Cookies.remove("email");
  Cookies.remove("token");
  window.location.reload();
};
