"use client";

import { useFormik } from "formik";
import React, { useState } from "react";
import { codeValidationSchema as validationSchema } from "@/lib/validationSchema";
import LoadingSpinner from "./LoadingSpinner";
import CreateCodeSuccessCard from "./CreateCodeSuccessCard";

const initialValues = {
  amount: 0,
  nameofpayer: "",
};

const GetCodeForm = () => {
  const [errormessage] = useState("Failed to generate code");
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);
  const [amountPaid, setAmountPaid] = useState(null);

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
        setAmountPaid(amountPaid)
      } catch (err) {
        setError(err.code ?? errormessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (code != null) return <CreateCodeSuccessCard code={code} amountPaid={amountPaid} />;

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                  placeholder="Amount in GHS"
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
                className="w-[10rem] h-[10rem] rounded-full mx-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 justify-center"
              >
                {formik.isSubmitting && (
                  <span>
                    <LoadingSpinner />
                  </span>
                )}
                <span>Generate code</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetCodeForm;
