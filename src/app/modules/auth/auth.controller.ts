import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { setAuthCookie } from "../../utils/setCookies";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userToken";
const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.login(req.body);
    console.log(loginInfo);
    setAuthCookie(res, { accessToken: loginInfo.accessToken });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in Successfully",
      data: loginInfo,
    });
  },
);

const logout = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Logout called");
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged out Successfully",
      data: null,
    });
  },
);

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken =
    await createNewAccessTokenWithRefreshToken(refreshToken);
  return {
    accessToken: newAccessToken,
  };
};

export const AuthController = {
  login,
  logout,
  getNewAccessToken,
};
