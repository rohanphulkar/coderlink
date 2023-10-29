import Cookies from "js-cookie";
export const Login = (token: string, email: string) => {
  Cookies.set("email", email);
  Cookies.set("token", token);
  window.location.reload();
};
