import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome to TTC &apos;23
            </h1>

            <img src="/logo.jpg" alt="" className="w-full h-auto rounded-lg" />

            <div>
              <div className="flex gap-4 items-center">
                <Link
                  href="/add-room"
                  className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex items-center gap-2 justify-center"
                >
                  Admin Portal
                </Link>
                <Link
                  href="/book"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 justify-center"
                >
                  Book Room
                </Link>
              </div>

              <div className="flex gap-4 items-center mt-4">
                <Link
                  href="/rooms"
                  className="flex flex-1 items-center justify-center text-sm text-center font-medium transition-colors text-cyan-950 hover:text-cyan-700 py-2 px-4 border border-solid border-cyan-500 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
                >
                  Rooms
                </Link>

                <Link
                  href="/summary"
                  className="flex flex-1 items-center justify-center text-sm text-center font-medium transition-colors text-fuchsia-950 hover:text-fuchsia-700 py-2 px-4 border border-solid border-fuchsia-500 bg-fuchsia-400 hover:bg-fuchsia-300 rounded-lg"
                >
                  Summary
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
