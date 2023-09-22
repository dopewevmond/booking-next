import GuestModel from "@/models/Guest";

export const getAllGuests = async () => {
  const guests = await GuestModel.find()
  return guests
}

