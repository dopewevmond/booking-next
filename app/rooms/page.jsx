import AuthwallCard from "@/components/AuthwallCard";
import BackToHomeButton from "@/components/BackToHomeButton";
import LogoutButton from "@/components/LogoutButton";
import RoomTableRowDetails from "@/components/RoomTableRowDetails";
import { validateJWT } from "@/lib/auth";
import Room from "@/models/Room";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function Rooms() {
  const cookieStore = cookies();
  const authToken = cookieStore.get(process.env.COOKIE_KEY);
  if (!authToken || !authToken.value) return <AuthwallCard />;
  const { isadmin } = await validateJWT(authToken.value);
  if (!isadmin) return <AuthwallCard />;

  const rooms = await Room.find().sort({ createdAt: 1 });

  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto px-8 pt-4 pb-20 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium leading-[150%] my-8 text-gray-800 dark:text-gray-100">
            Rooms
          </h3>

          <div className="flex items-center gap-4">
            <BackToHomeButton />
            <LogoutButton />
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Room name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Max. Occupants
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned Occupants
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <RoomTableRowDetails
                  key={room._id}
                  id={room._id}
                  name={room.roomname}
                  maxOccupants={room.roomnumber}
                  gender={room.gender}
                  numOccupied={room.guests?.length}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
