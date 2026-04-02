import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errorHelpers/ApiError";
import { UserService } from "./user.service";

const createUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
      success: true,
      message: "User created successfully",
      statusCode: 201,
      data: user,
    });
  },
);

const getMe = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    console.log(decodedToken, "getMe");
    const result = await UserService.getMe(decodedToken.userId);
    console.log(result, "getMe result");
    sendResponse(res, {
      success: true,
      message: "User retrieved successfully",
      statusCode: 200,
      data: result,
    });
  },
);

const updateProfile = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as JwtPayload).userId;
    if (!userId) {
      throw new ApiError(400, "User Id is Required");
    }
    const profile = await UserService.updateProfile(userId, req.body);
    sendResponse(res, {
      success: true,
      message: "Profile updated successfully",
      statusCode: 200,
      data: profile,
    });
  },
);
export const UserController = {
  createUser,
  getMe,
  updateProfile,
};
