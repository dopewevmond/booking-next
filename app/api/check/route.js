import Guest from "@/models/Guest"
import Room from "@/models/Room"

export async function GET(req) {
  const gender = 'male'
  const guest = Guest
  const room = await Room.find({ gender, $expr: { $lt: [{ $size: '$guests' }, '$roomnumber'] } }).sort({ createdAt: 1 }).limit(1)
  // const room = await Room.find({ gender }).sort({ createdAt: 1 }).limit(1)
    console.log(room[0])
    console.log('num of guests', room[0].guests.length)

    return Response.json(room)
}