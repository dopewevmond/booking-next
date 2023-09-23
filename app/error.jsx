"use client";

import React, { useEffect } from "react";

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen md:flex">
      <section class="bg-gray-200 dark:bg-gray-900 flex-1 min-h-screen flex items-center">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 mb-8">
              oops...
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              {error.message}
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1 md:min-h-screen flex items-center">
        <div className="px-4 md:px-8 lg:px-12">
          <img src="/error-image.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
