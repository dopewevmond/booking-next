import Link from 'next/link'
import React from 'react'
import { HiX } from 'react-icons/hi'

const AuthwallCard = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-4 items-center justify-center">
              
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
              
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Authentication Error
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-100 font-medium text-center">
              You need to be logged in to access this page
            </p>

            <Link
              href='/login'
              className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex items-center gap-2 justify-center"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthwallCard