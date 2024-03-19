import User from "../models/user";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../schemas/user";
import { generalAccessToken } from "../services/jwtServices";

// REGISTER
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validate các trường dữ liệu trước khi đăng ký
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errArr = error.details.map((e) => e.message);
            return res.status(400).json({
                message: errArr,
            });
        }

        // kiểm tra xem email đăng ký đã tồn tại trong db chưa
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: `Email already exists. Please choose another email!`,
            });
        }

        // mã hóa password trước khi đăng ký
        const hashedPassword = await bcrypt.hash(password, 10);

        // tạo tài khoản
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        // để  password là undefined vì không muốn trả về khi thông báo thành công
        user.password = undefined;
        return res.status(200).json({
            message: "Account register successfully!",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate các trường dữ liệu trước khi đăng nhập
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errArr = error.details.map((e) => e.message);
            return res.status(400).json({
                message: errArr,
            });
        }

        // kiểm tra xem tài khoản có tồn tại hay không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Account does not exist. Please check again',
            });
        }

        // so sánh password gửi lên với password trong db có khớp không
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({
                message: 'Wrong password. Please try again!',
            });
        }

        // tạo access token
        const accessToken = generalAccessToken({
            _id: user.id,
            name: user.name,
            email,
        });

        return res.status(200).json({
            message: "Login successfully!",
            accessToken,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
