import ApiError from "../../errorHelpers/ApiError";
import { IAuthProvider, IUser } from "./user.interface";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(process.env.SALT_ROUNDS),
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    ...rest,
  });
  return user;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  console.log(user, "getMe-3");
  return {
    data: user,
  };
};

const updateProfile = async (userId: string, payload: Partial<IUser>) => {
  if (payload.password) {
    const hashedPassword = await bcryptjs.hash(
      payload.password,
      Number(process.env.SALT_ROUNDS),
    );
    payload.password = hashedPassword;
  }

  const profile = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true },
  ).select("-password");

  return profile;
};
export const UserService = {
  createUser,
  getMe,
  updateProfile,
};
