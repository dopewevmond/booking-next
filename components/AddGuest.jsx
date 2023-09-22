"use client";
import React, { useState } from "react";
import BookingSuccessfulCard from "./BookingSuccessfulCard";
import { Field, Form, Formik } from "formik";
import { bookValidationSchema as validationSchema } from "@/lib/validationSchema";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";

const AddGuest = () => {
  const [bookedSuccessfully, setBookedSuccessfully] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(null);
  const [guestName, setGuestName] = useState(null);
  const [error, setError] = useState(null);

  if (bookedSuccessfully) {
    return <BookingSuccessfulCard roomnumber={bookedRoom} name={guestName} />;
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {error && (
        <Toast className="flex w-fit items-center justify-center p-2 fixed top-4 right-0 left-0 mx-auto">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
          <Toast.Toggle />
        </Toast>
      )}

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-16">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
              Book room
            </h1>

            <Formik
              initialValues={{
                fullname: "",
                gender: "",
                branch: "",
                code: "",
                studentOrAlumni: "",
                highestlevelofeducation: "",
                institution: "",
                currentlyemployed: "",
                jobtitle: "",
                currentplaceofemployment: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const res = await fetch("/api/book", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });
                  const data = await res.json();
                  console.log(data);

                  if (!res.ok) {
                    throw new Error(data.message ?? "Unable to book room");
                  }

                  setBookedRoom(data.roomName);
                  setGuestName(data.name);
                  setBookedSuccessfully(true);
                } catch (err) {
                  setError(err.message ?? "Unable to book room");
                  // setTimeout(() => {
                  //   if (window) window.location.reload();
                  // }, 2000);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, touched, values, isSubmitting, setSubmitting }) => (
                <Form className="w-full max-w-md mx-auto">
                  <div className="mb-4">
                    <label
                      htmlFor="code"
                      className="block text-gray-400 font-semibold mb-2"
                    >
                      Code
                    </label>
                    <Field
                      type="text"
                      id="code"
                      name="code"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.code && touched.code && (
                      <div className="text-red-500">{errors.code}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="fullname"
                      className="block text-gray-400 font-semibold mb-2"
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.fullname && touched.fullname && (
                      <div className="text-red-500">{errors.fullname}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 font-semibold mb-2">
                      Gender
                    </label>
                    <div>
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value="male"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">Male</span>
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="gender"
                          value="female"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">Female</span>
                      </label>
                    </div>
                    {errors.gender && touched.gender && (
                      <div className="text-red-500">{errors.gender}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="branch"
                      className="block text-gray-400 font-semibold mb-2"
                    >
                      Branch
                    </label>
                    <Field
                      type="text"
                      id="branch"
                      name="branch"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.branch && touched.branch && (
                      <div className="text-red-500">{errors.branch}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="studentOrAlumni"
                      className="block text-gray-400 font-semibold mb-2"
                    >
                      Status
                    </label>

                    <label>
                      <Field
                        type="radio"
                        name="studentOrAlumni"
                        value="student"
                        className="mr-1"
                      />
                      <span className="dark:text-gray-100">Student</span>
                    </label>
                    <label className="ml-4">
                      <Field
                        type="radio"
                        name="studentOrAlumni"
                        value="alumni"
                        className="mr-1"
                      />
                      <span className="dark:text-gray-100">Alumni</span>
                    </label>
                    <label className="ml-4">
                      <Field
                        type="radio"
                        name="studentOrAlumni"
                        value="associate"
                        className="mr-1"
                      />
                      <span className="dark:text-gray-100">Associate</span>
                    </label>
                    {errors.studentOrAlumni && touched.studentOrAlumni && (
                      <div className="text-red-500">
                        {errors.studentOrAlumni}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 font-semibold mb-2">
                      Highest Level of Education
                    </label>
                    <div>
                      <label>
                        <Field
                          type="radio"
                          name="highestlevelofeducation"
                          value="jhs"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">JHS</span>
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="highestlevelofeducation"
                          value="shs"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">SHS</span>
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="highestlevelofeducation"
                          value="tertiary"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">Tertiary</span>
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="highestlevelofeducation"
                          value="postgraduate"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">Postgraduate</span>
                      </label>
                    </div>
                    {errors.highestlevelofeducation &&
                      touched.highestlevelofeducation && (
                        <div className="text-red-500">
                          {errors.highestlevelofeducation}
                        </div>
                      )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="institution"
                      className="block text-gray-400 font-semibold mb-2"
                    >
                      Institution
                    </label>
                    <Field
                      type="text"
                      id="institution"
                      name="institution"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.institution && touched.institution && (
                      <div className="text-red-500">{errors.institution}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 font-semibold mb-2">
                      Currently Employed
                    </label>
                    <div>
                      <label>
                        <Field
                          type="radio"
                          name="currentlyemployed"
                          value="yes"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">Yes</span>
                      </label>
                      <label className="ml-4">
                        <Field
                          type="radio"
                          name="currentlyemployed"
                          value="no"
                          className="mr-1"
                        />
                        <span className="dark:text-gray-100">No</span>
                      </label>
                    </div>
                    {errors.currentlyemployed && touched.currentlyemployed && (
                      <div className="text-red-500">
                        {errors.currentlyemployed}
                      </div>
                    )}
                  </div>

                  {values.currentlyemployed === "yes" && (
                    <div>
                      <div className="mb-4">
                        <label
                          htmlFor="jobtitle"
                          className="block text-gray-400 font-semibold mb-2"
                        >
                          Job Title
                        </label>
                        <Field
                          type="text"
                          id="jobtitle"
                          name="jobtitle"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.jobtitle && touched.jobtitle && (
                          <div className="text-red-500">{errors.jobtitle}</div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="currentplaceofemployment"
                          className="block text-gray-400 font-semibold mb-2"
                        >
                          Current Place of Employment
                        </label>
                        <Field
                          type="text"
                          id="currentplaceofemployment"
                          name="currentplaceofemployment"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.currentplaceofemployment &&
                          touched.currentplaceofemployment && (
                            <div className="text-red-500">
                              {errors.currentplaceofemployment}
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                      {isSubmitting ? "submitting..." : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddGuest;
