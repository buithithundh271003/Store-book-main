import cloudinary from "../config/cloudinary";

// Thêm ảnh
export const uploadImage = async (req, res) => {
    const files = req.files;

    if (!Array.isArray(files)) {
        return res.status(400).json({ error: "No files were uploaded!" });
    }

    try {
        const uploadPromises = files?.map((file) => {
            // Sử dụng cloudinary api để upload file lên cloudinary
            return cloudinary.uploader.upload(file.path);
        });

        // Chờ cho tất cả các file đều được upload lên cloudinary
        const results = await Promise.all(uploadPromises);

        // Trả về kết quả một mảng các đối tượng chứa thông tin các file đã upload lên cloudinary
        const uploadedFiles = results.map((result) => ({
            url: result.secure_url,
            publicId: result.public_id,
        }));

        return res.json({ urls: uploadedFiles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
