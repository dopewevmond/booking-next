"use client";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { bookValidationSchema as validationSchema } from "@/lib/validationSchema";
import StatusCard from "./StatusCard";
import Link from "next/link";
import BackToHomeButton from "./BackToHomeButton";

const AddGuest = () => {
  const [bookedSuccessfully, setBookedSuccessfully] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(null);
  const [guestName, setGuestName] = useState(null);
  const [error, setError] = useState(null);

  if (error) {
    return (
      <StatusCard status="error" heading="Unable to add room" message={error} />
    );
  }

  if (bookedSuccessfully) {
    return (
      <StatusCard
        status="success"
        heading="Room booked successfully"
        innerContent=<div className="text-sm text-center">
          <p className="mb-2 text-gray-800 dark:text-white font-medium text-lg">
            Room: {bookedRoom}
          </p>
          <p className="text-gray-800 dark:text-white font-medium text-lg">
            Name of guest: {guestName}
          </p>
        </div>
      />
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-16">
        <div className="w-full max-w-md mx-auto">
        <div className="mb-4 flex justify-center">
            <BackToHomeButton />
          </div>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
                Book room
              </h1>

              <Formik
                initialValues={{
                  fullname: "",
                  dob: "",
                  gender: "",
                  branch: "",
                  code: "",
                  studentOrAlumni: "",
                  highestlevelofeducation: "",
                  institution: "",
                  currentlyemployed: "",
                  jobtitle: "",
                  currentplaceofemployment: "",
                  phonenumber: "",
                  emailaddress: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm, errors }) => {
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
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  isSubmitting,
                  setSubmitting,
                  setFieldValue,
                }) => (
                  <Form className="w-full max-w-lg mx-auto">
                    <div className="mb-4">
                      <label
                        htmlFor="code"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Code <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        id="code"
                        name="code"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.code && touched.code && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.code}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="fullname"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.fullname && touched.fullname && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.fullname}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="dob"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Date of birth{" "}
                        <span className="text-orange-500">
                          (month and day only)
                        </span>
                        <span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        onChange={(e) => setFieldValue("dob", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.dob && touched.dob && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.dob}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="emailaddress"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Email address
                      </label>
                      <Field
                        type="text"
                        id="emailaddress"
                        name="emailaddress"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.emailaddress && touched.emailaddress && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.emailaddress}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="phonenumber"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Phone number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.phonenumber && touched.phonenumber && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.phonenumber}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-400 font-semibold mb-2">
                        Gender <span className="text-red-500">*</span>
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
                        <div className="text-red-500 text-sm mt-1">
                          {errors.gender}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="branch"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Branch <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        id="branch"
                        name="branch"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.branch && touched.branch && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.branch}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="studentOrAlumni"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Status <span className="text-red-500">*</span>
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
                        <div className="text-red-500 text-sm mt-1">
                          {errors.studentOrAlumni}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-400 font-semibold mb-2">
                        Highest Level of Education <span className="text-red-500">*</span>
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
                          <span className="dark:text-gray-100">
                            Postgraduate
                          </span>
                        </label>
                      </div>
                      {errors.highestlevelofeducation &&
                        touched.highestlevelofeducation && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.highestlevelofeducation}
                          </div>
                        )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="institution"
                        className="block text-gray-400 font-semibold mb-2"
                      >
                        Institution <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        id="institution"
                        name="institution"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.institution && touched.institution && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.institution}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-400 font-semibold mb-2">
                        Currently Employed <span className="text-red-500">*</span>
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
                      {errors.currentlyemployed &&
                        touched.currentlyemployed && (
                          <div className="text-red-500 text-sm mt-1">
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
                            <div className="text-red-500 text-sm mt-1">
                              {errors.jobtitle}
                            </div>
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
                              <div className="text-red-500 text-sm mt-1">
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
      </div>
    </section>
  );
};

export default AddGuest;
