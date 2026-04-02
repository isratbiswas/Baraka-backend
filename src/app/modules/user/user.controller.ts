import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

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

const updateProfile;
export const UserController = {
  createUser,
  getMe,
  updateProfile,
};
