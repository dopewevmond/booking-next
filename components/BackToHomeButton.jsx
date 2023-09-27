import Link from 'next/link'
import React from 'react'

const BackToHomeButton = () => {
  return (
    <Link href='/' className="w-fit border-2 border-gray-500 rounded-lg px-4 py-2 text-sm block text-center font-medium text-gray-700 hover:text-gray-500 dark:text-gray-200 hover:dark:text-gray-50">Back to home</Link>
    )
}

export default BackToHomeButton