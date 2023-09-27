import Room from "@/models/Room";
import React from "react";
import AuthwallCard from "@/components/AuthwallCard";
import { validateJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import Guest from "@/models/Guest";
import Link from "next/link";

async function getRoomDetails(_id) {
  const roomDetails = await Room.findOne({ _id });
  const guests = [];
  if (roomDetails == null) throw new Error("Room was not found");
  for (let i = 0; i < roomDetails.guests.length; i++) {
    guests.push(await Guest.findById(roomDetails.guests[i].toString()));
  }
  return { roomDetails, guests };
}

export default async function RoomDetails({ params: { id } }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get(process.env.COOKIE_KEY);
  if (!authToken || !authToken.value) return <AuthwallCard />;
  const { isadmin } = await validateJWT(authToken.value);
  if (!isadmin) return <AuthwallCard />;

  const { roomDetails, guests } = await getRoomDetails(id);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full max-w-lg mx-auto">
          <Link
            href="/"
            className="block mb-4 text-center font-medium text-gray-700 hover:text-gray-500 dark:text-gray-200 hover:dark:text-gray-50"
          >
            Back to Home
          </Link>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Room details
              </h1>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[1.125rem] leading-[165%] text-gray-800 dark:text-gray-300 border-0 border-b py-2">
                  <span className="text-sm">Room name</span>
                  <span className="font-medium">{roomDetails.roomname}</span>
                </div>
                <div className="flex justify-between items-center text-[1.125rem] leading-[165%] text-gray-800 dark:text-gray-300 border-0 border-b py-2">
                  <span className="text-sm">Gender</span>
                  <span className="font-medium">{roomDetails.gender}</span>
                </div>
                <div className="flex justify-between items-center text-[1.125rem] leading-[165%] text-gray-800 dark:text-gray-300 border-0 border-b py-2">
                  <span className="text-sm">Max. occupants</span>
                  <span className="font-medium">{roomDetails.roomnumber}</span>
                </div>
                <div className="flex justify-between items-center text-[1.125rem] leading-[165%] text-gray-800 dark:text-gray-300 border-0 border-b py-2">
                  <span className="text-sm">Assigned occupants</span>
                  <span className="font-medium">{guests.length}</span>
                </div>
              </div>

              <h3 className="text-center font-semibold mt-24 text-gray-800 dark:text-gray-100 text-xl">Occupants</h3>
              <div className=" space-y-4">
                {guests.map(guest => (
                  <div key={guest._id} className="border-0 border-b">
                    <div className="flex justify-between items-center leading-[165%] text-gray-800 dark:text-gray-300 py-2">
                      <span className="text-sm">Name</span>
                      <span className="font-medium">{guest.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center leading-[165%] text-gray-800 dark:text-gray-300 py-2">
                      <span className="text-sm">Phone number</span>
                      <span className="font-medium">{guest.phonenumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
