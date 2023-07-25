import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import "react-typed/dist/animatedCursor.css";
import Typed from "react-typed";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email && data.password) {
      axios
        .post("http://localhost:3001/api/Admin/Login", data)
        .then((res) => {
          const token = res.data.accessToken;
          const user_type = res.data.data.user_type;
          const expirationTime = new Date();
          expirationTime.setDate(expirationTime.getDate() + 7); // Cookie expires in 1 week
          Cookies.set("token", token, {
            expires: expirationTime,
            sameSite: "strict",
          });
          Cookies.set("user_type", user_type, {
            expires: expirationTime,
            sameSite: "strict",
          });
          if (user_type === "1") {
            navigate("/admin/dashboard");
          } else {
            navigate("/customer/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //const storedToken = Cookies.get('token');
  //Cookies.remove('token');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 dark:!bg-gray-850 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-blue-300 to-blueSecondary shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative bg-white px-4 py-10 shadow-lg dark:!bg-gray-750 sm:rounded-3xl sm:p-20">
          <div className="mx-auto max-w-md">
            <div>
              <h1 className="text-2xl opacity-70 dark:!text-white">
                <Typed
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "500",
                  }}
                  strings={["Welcome To Starkenn Technologies.."]}
                  typeSpeed={55}
                />
              </h1>
            </div>

            <div className="divide-y">
              <div className="space-y-8 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                  <div class="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:!bg-gray-800 dark:!text-white dark:focus:border-blue-500"
                      placeholder=" "
                    />
                    <label
                      for="Email"
                      class="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-300 dark:!text-gray-400 peer-focus:dark:!text-gray-100"
                    >
                      Username
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:!bg-gray-800 dark:!text-white dark:focus:border-blue-500"
                      placeholder=" "
                    />
                    <label
                      for="password"
                      class="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-300 dark:!text-gray-400 peer-focus:dark:!text-gray-100"
                    >
                      Password
                    </label>
                    <div className="absolute right-2.5 top-4">
                      {showPassword ? (
                        <FaEyeSlash
                          className="h-5 w-5 cursor-pointer  text-gray-500"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaEye
                          className="h-5 w-5 cursor-pointer text-gray-600"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      className="rounded-md bg-blueSecondary py-1 pl-4 pr-8 text-white dark:!bg-gray-100 dark:!text-gray-850"
                    >
                      Sign In
                      <BsArrowRightCircleFill className="absolute left-[4.6rem] top-[0.6rem]" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative border-0 text-center">
              <p>
                <a href="/" className="text-blue-600 underline">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
          <FixedPlugin />
        </div>
      </div>
    </div>
  );
}
