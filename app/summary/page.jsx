import AuthwallCard from '@/components/AuthwallCard';
import BackToHomeButton from '@/components/BackToHomeButton';
import LogoutButton from '@/components/LogoutButton';
import SummaryCard from '@/components/SummaryCard';
import { validateJWT } from '@/lib/auth';
import PaymentCode from '@/models/PaymentCode';
import Room from '@/models/Room';
import { cookies } from 'next/headers';
import React from 'react'

export default async function Summary () {
  const cookieStore = cookies();
  const authToken = cookieStore.get(process.env.COOKIE_KEY);
  if (!authToken || !authToken.value) return <AuthwallCard />;
  const formatter = new Intl.NumberFormat('en-US');

  const { isadmin } = await validateJWT(authToken.value);
  if (!isadmin) return <AuthwallCard />;

  let numRooms = 0;
  let numBeds = 0;
  let numCodesGenerated = 0 ;
  let numCodesUsed = 0;
  let totalAmountPaid = 0;

  const roomDetails = await Room.aggregate([
    {
      $group: {
        _id: null,
        totalRooms: { $sum: 1 }, // Count the rooms
        totalBeds: { $sum: '$roomnumber' }, // Sum the numbeds field to get total beds
      },
    },
  ]);
  const paymentDetails = await PaymentCode.aggregate([
    {
      $group: {
        _id: null,
        totalCodesGenerated: { $sum: 1 },
        totalCodesUsed: { $sum: { $cond: { if: "$hasBeenRedeemed", then: 1, else: 0 } } },
        totalAmountPaid: { $sum: { $toDouble: "$amountPaid" } }, // Assuming amountPaid is stored as a string, convert it to a number if necessary
      },
    },
  ]);

  if (roomDetails.length > 0) {
    numRooms = roomDetails[0].totalRooms;
    numBeds = roomDetails[0].totalBeds;
  }

  if (paymentDetails.length > 0) {
    numCodesGenerated = paymentDetails[0].totalCodesGenerated;
    numCodesUsed = paymentDetails[0].totalCodesUsed;
    totalAmountPaid = paymentDetails[0].totalAmountPaid;
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto px-8 pt-4 pb-20 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium leading-[150%] my-8 text-gray-800 dark:text-gray-100">
            Summary
          </h3>

          <div className="flex items-center gap-4">
            <BackToHomeButton />
            <LogoutButton />
          </div>

        </div>
          <div className="flex flex-col md:flex-row gap-8 flex-wrap">
            <SummaryCard
              title='Total amount paid'
              value={`GH₵${formatter.format(Number(totalAmountPaid).toFixed(2))}`}
            />
            <SummaryCard
              title='Total rooms'
              value={numRooms}
            />
            <SummaryCard
              title='Total beds'
              value={numBeds}
            />
            <SummaryCard
              title='Codes generated'
              value={numCodesGenerated}
            />
            <SummaryCard
              title='Codes used'
              value={numCodesUsed}
            />
          </div>
      </div>
    </div>
  )
}
