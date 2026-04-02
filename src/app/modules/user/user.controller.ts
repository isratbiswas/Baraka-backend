import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";

const createUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const UserController = {
  createUser,
  getMe,
  updateProfile,
};
