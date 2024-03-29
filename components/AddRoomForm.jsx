"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { roomValidationSchema as validationSchema } from "@/lib/validationSchema";
import LoadingSpinner from "./LoadingSpinner";
import StatusCard from "./StatusCard";
import Link from "next/link";
import BackToHomeButton from "./BackToHomeButton";
import MiniButtonNav from "./MiniButtonNav";

const AddRoomForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        const res = await fetch("/api/add-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.status !== 201) throw new Error("Unable to add room");
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setError(err.message ?? "Unable to add room");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGenderButtons = (e) => (formik.values.gender = e.target.value);

  if (error) {
    return (
      <StatusCard
        status="error"
        heading="Unable to add room"
        message="Please click on Continue to reload and try again"
      />
    );
  }

  if (success) {
    return (
      <StatusCard
        status="success"
        heading="Room added successfully"
        message="Please click on Continue to add more rooms"
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
            <div className="p-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">
                Add Room
              </h1>
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="roomname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Room name
                  </label>
                  <input
                    type="roomname"
                    name="roomname"
                    id="roomname"
                    value={formik.values.roomname}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Room name"
                  />
                  {formik.errors.roomname && (
                    <span className="text-sm text-red-600">
                      {formik.errors.roomname}
                    </span>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="roomnumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Room capacity (number of people)
                  </label>
                  <input
                    type="number"
                    name="roomnumber"
                    id="roomnumber"
                    value={formik.values.roomnumber}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {formik.errors.roomnumber && (
                    <span className="text-sm text-red-600">
                      {formik.errors.roomnumber}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <input
                      id="male"
                      type="radio"
                      value="male"
                      onChange={(e) => handleGenderButtons(e)}
                      name="gender"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="male"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center mb-8">
                    <input
                      id="female"
                      type="radio"
                      value="female"
                      onChange={(e) => handleGenderButtons(e)}
                      name="gender"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="female"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>

                  {formik.errors.gender && (
                    <span className="text-sm text-red-600">
                      {formik.errors.gender}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 justify-center"
                >
                  {formik.isSubmitting && <LoadingSpinner />}
                  {formik.isSubmitting ? "Adding room" : "Add room"}
                </button>
              </form>

              <p className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">
                Want to generate codes instead? Click{" "}
                <Link
                  href="/get-code"
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

export default AddRoomForm;

const initialValues = {
  roomname: "",
  roomnumber: 4,
  gender: "",
};
