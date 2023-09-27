"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RoomTableRowDetails = ({ id, name, gender, maxOccupants, numOccupied }) => {
  const router = useRouter();
  return (
    <tr
      onClick={() => {
        if (id)
          router.push(`/rooms/${id}`);
      }}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{gender}</td>
      <td className="px-6 py-4">{maxOccupants}</td>
      <td className="px-6 py-4">{numOccupied}</td>
    </tr>
  );
};

export default RoomTableRowDetails;
