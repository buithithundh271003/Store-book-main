import { Router } from "express";
import { login, register } from "../controllers/user";
const router = Router();

router.post("/signup", register);
router.post("/signin", login);

export default router;
