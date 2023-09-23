import { validateJWT } from "@/lib/auth";
import { generateRandomCodeWithNumber } from "@/lib/paymentcode";
import { codeValidationSchema } from "@/lib/validationSchema";
import PaymentCode from "@/models/PaymentCode";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = cookies()
    const authcookie = cookieStore.get(process.env.COOKIE_KEY)
    if (!authcookie || !authcookie.value) throw new Error('Unable to get access token from cookie')
    const { isadmin } = await validateJWT(authcookie.value);
    if (!isadmin) throw new Error('Does not have permissions to create a token')

    const { amount, nameofpayer } = await req.json();
    codeValidationSchema.validate({ amount, nameofpayer })

    let attempts = 0;
    let generatedCode = generateRandomCodeWithNumber();
    // query the database to see if the code doesnt already exist
    let doesCodeExist = await PaymentCode.findOne({ code: generatedCode })
    // if (doesCodeExist != null) throw new Error('Code')
    while (generatedCode === doesCodeExist?.code && attempts < 9) {
      generatedCode = generateRandomCodeWithNumber()
      doesCodeExist = await PaymentCode.findOne({ code: generatedCode })
      attempts++;
    }
    if (generatedCode === doesCodeExist?.code) {
      throw new Error('Unable to generate a unique code')
    }
    // otherwise we are clear to save in the database
    const savedCode = await PaymentCode.create({
      code: generatedCode,
      amountPaid: amount,
      nameofpayer
    })
    
    return Response.json({ message: "success", ...savedCode }, { status: 201 });
  } catch (err) {
    console.log(err)
      return Response.json({
        message: err.message ?? "Adding room failed",
      }, { status: 401 });
  }
}