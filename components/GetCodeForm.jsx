"use client";

import { useFormik } from "formik";
import React, { useState } from "react";
import { codeValidationSchema as validationSchema } from "@/lib/validationSchema";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import StatusCard from "./StatusCard";
import BackToHomeButton from "./BackToHomeButton";
import MiniButtonNav from "./MiniButtonNav";

const initialValues = {
  amount: 0,
  nameofpayer: "",
};

const GetCodeForm = () => {
  const [errormessage] = useState("Failed to generate code");
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);
  const [amountPaid, setAmountPaid] = useState(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Logout failed");
      setHasLoggedOut(true);
      if (window) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch("/api/get-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!res.ok || res.status !== 201) throw new Error(errormessage);
        const {
          _doc: { code, amountPaid },
        } = await res.json();
        setCode(code);
        setAmountPaid(amountPaid);
      } catch (err) {
        setError(err.code ?? errormessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (error) {
    return (
      <StatusCard
        status="error"
        heading="Unable to add room"
        message="Please click on Continue to reload and try again"
      />
    );
  }

  if (code != null) {
    return (
      <StatusCard
        status="success"
        heading="Code created successfully"
        innerContent=<div className="text-sm text-center">
          <p className="mb-2 text-gray-800 dark:text-white font-medium text-lg">Code: {code}</p>
          <p className="text-gray-800 dark:text-white font-medium text-lg">
            Amount paid: GHS {amountPaid}
          </p>
        </div>
      />
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full max-w-md mx-auto">
        <div className="mb-4 flex justify-center">
            <BackToHomeButton />
          </div>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Generate code
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="nameofpayer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name of payer
                  </label>
                  <input
                    value={formik.values.nameofpayer}
                    onChange={formik.handleChange}
                    type="text"
                    name="nameofpayer"
                    id="nameofpayer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name of payer"
                    required=""
                  />
                  {formik.errors.nameofpayer && (
                    <span className="text-sm text-red-600">
                      {formik.errors.nameofpayer}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Please enter amount paid (in GHS)
                  </label>
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    type="number"
                    name="amount"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Amount in GHS"
                    required=""
                  />
                  {formik.errors.amount && (
                    <span className="text-sm text-red-600">
                      {formik.errors.amount}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 justify-center"
                >
                  {formik.isSubmitting && <LoadingSpinner />}
                  {formik.isSubmitting ? "Generating code..." : "Generate code"}
                </button>
              </form>

              <p className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">
                Want to create a room instead? Click{" "}
                <Link
                  href="/add-room"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  here
                </Link>
              </p>
            </div>
          </div>

          <MiniButtonNav />

          <button
            onClick={logout}
            className="flex items-center justify-center mx-auto text-sm mt-4 text-center font-medium transition-colors text-red-950 hover:text-red-700 py-2 px-4 border border-solid border-red-500 bg-red-400 hover:bg-red-300 rounded-lg"
          >
            {isLoggingOut && <LoadingSpinner />}
            {isLoggingOut
              ? "Logging out..."
              : hasLoggedOut
              ? "Redirecting to Home"
              : "Logout"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetCodeForm;
