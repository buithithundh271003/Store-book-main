import { Router } from "express";
import { upload } from "../middlewares/upload";

import { uploadImage } from "../controllers/upload.js";

const router = Router();

router.post("/upload", upload.array("image", 10), uploadImage);

export default router;
