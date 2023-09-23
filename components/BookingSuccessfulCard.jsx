import React from "react";

const BookingSuccessfulCard = ({ roomnumber, name }) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-16">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4 text-center">
              Room booked successfully
            </h1>

            <p className="text-lg text-white font-medium">Name: {name}</p>
            <p className="text-lg text-white font-medium">Room number: {roomnumber}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSuccessfulCard;
