import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/register", UserController.createUser);
router.get("/me", UserController.getMe);
router.patch("/me", UserController.updateProfile);
// router.patch("/:id", UserController.updateUser);

export const UserRoute = router;
