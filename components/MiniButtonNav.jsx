import Link from "next/link";
import React from "react";

const MiniButtonNav = () => {
  return (
    <>
      <Link
        href="/rooms"
        className="flex items-center justify-center mx-auto text-sm mt-4 text-center font-medium transition-colors text-cyan-950 hover:text-cyan-700 py-2 px-4 border border-solid border-cyan-500 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
      >
        Rooms
      </Link>
      
      <Link
        href="/summary"
        className="flex items-center justify-center mx-auto text-sm mt-4 text-center font-medium transition-colors text-fuchsia-950 hover:text-fuchsia-700 py-2 px-4 border border-solid border-fuchsia-500 bg-fuchsia-400 hover:bg-fuchsia-300 rounded-lg"
      >
        Summary
      </Link>
    </>
  );
};

export default MiniButtonNav;
