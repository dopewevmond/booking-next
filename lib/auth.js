import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const checkPasswordsMatch = (
  plainPassword,
  hashedPassword
) => bcrypt.compare(plainPassword, hashedPassword);

export const createJWT = ({ username, isadmin }) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24;

  return new SignJWT({ username, isadmin })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};