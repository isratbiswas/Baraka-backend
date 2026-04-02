import { envVars } from "../../config/env";
import ApiError from "../../errorHelpers/ApiError";
import { generateToken } from "../../utils/jwt";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const login = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid password");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  console.log(jwtPayload, "jwtPayload");

  const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_SECRET_KEY as string,
    envVars.JWT_ACCESS_EXPIRES,
  );
  const refreshToken = generateToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    envVars.JWT_REFRESH_EXPIRES,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken =
    await createNewAccessTokenWithRefreshToken(refreshToken);
  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  login,
  getNewAccessToken,
};
