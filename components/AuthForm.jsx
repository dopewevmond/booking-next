"use client";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { authValidationSchema as validationSchema } from "@/lib/validationSchema";
import Link from "next/link";

const AuthForm = ({ mode = "login" }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (mode === "login") {
          await handleLogin(values);
          if (window) window.location.replace('/add-room')
        } else {
          await handleSignup(values);
          router.push("/login");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLogin = async (values) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Unable to login");
    return res.json();
  };

  const handleSignup = async (values) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Unable to sign up");
    return res.json();
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        {error && (
          <Toast className="flex w-fit items-center justify-center p-2 absolute top-4 right-0 left-0 mx-auto">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle />
          </Toast>
        )}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="block mb-4 text-center font-medium text-gray-700 hover:text-gray-500 dark:text-gray-200 hover:dark:text-gray-50">Back to Home</Link>
        
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  {mode === "login" ? "Log in" : "Sign up"}
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      type="username"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Username"
                      required=""
                    />
                    {formik.errors.username && (
                      <span className="text-sm text-red-600">
                        {formik.errors.username}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    {formik.errors.password && (
                      <span className="text-sm text-red-600">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 justify-center"
                  >
                    {formik.isSubmitting && <LoadingSpinner />}
                    <span>
                      {formik.isSubmitting ? (
                        <>{mode === "login" ? "Logging in" : "Signing up"}</>
                      ) : (
                        <>{mode === "login" ? "Log in" : "Sign up"}</>
                      )}
                    </span>
                  </button>
                </form>

                {mode === "login" ? (
                  <p className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">
                    Don&apos;t already have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Sign up
                    </Link>
                  </p>
                ) : (
                  <p className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Log in
                    </Link>
                  </p>
                )}
              </div>
            </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default AuthForm;

const initialValues = {
  username: "",
  password: "",
};
