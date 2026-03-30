import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtpayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtpayload,
    envVars.JWT__ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );
  return {
    accessToken,
  };
};
