import { NextFunction, Request, Response } from "express";
import ApiError from "../errorHelpers/ApiError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken || req.headers?.accessToken;

      if (!accessToken) {
        throw new ApiError(403, "No  token Received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT__ACCESS_SECRET,
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
      }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new ApiError(403, "You are not permitted to view the route!!");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
