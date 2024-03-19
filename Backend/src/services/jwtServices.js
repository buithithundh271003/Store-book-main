import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// tạo access token
export const generalAccessToken = (payload) => {
    const accessToken = jwt.sign({ payload }, process.env.JWT_PRIVATE, {
        expiresIn: "1h",
    });
    return accessToken;
};

// kiểm tra Token
export const generalVerifyToken = (payload) => {
    const verifyToken = jwt.verify(payload.accessToken, payload.privateKey);
    return verifyToken;
};