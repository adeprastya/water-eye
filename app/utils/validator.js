const validateRegisterData = (data) => {
  // Zacky
  // TODO: Validasi field yang diperlukan { email, password, name, picture }, dan format data sesuai
  // input: req.body
  // output: Jika valid kembalikan true, jika tidak kembalikan false

  return true;
};

const validateSigninData = (data) => {
  // Iskandar
  // TODO: Validasi field yang diperlukan { email, password }, dan format data sesuai
  // input: req.body
  // output: Jika valid kembalikan true, jika tidak kembalikan false

  return true;
};

const validateScanImage = (image) => {
  // Thessa
  // TODO: Validasi data dan format image sesuai
  // input: image
  // output: Jika valid kembalikan true, jika tidak kembalikan false
  try {
    // Validasi apakah input ada
    if (!image) {
      console.error("Image is required.");
      return false;
    }

    // Validasi apakah input memiliki tipe data Buffer atau Base64 string
    if (!(Buffer.isBuffer(image) || typeof image === "string")) {
      console.error("Invalid image format. Expected Buffer or Base64 string.");
      return false;
    }

    // Jika Base64 string, periksa apakah format valid
    if (typeof image === "string") {
      const base64Regex =
        /^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(image)) {
        console.error("Invalid Base64 image string format.");
        return false;
      }
    }

    // Validasi ukuran image jika menggunakan Buffer (misalnya, maksimum 5MB)
    if (Buffer.isBuffer(image) && image.length > 5 * 1024 * 1024) {
      console.error("Image size exceeds the maximum allowed size of 5MB.");
      return false;
    }

    // Jika semua validasi lolos
    return true;
  } catch (err) {
    console.error("Error validating image:", err);
    return false;
  }
};

module.exports = {
  validateRegisterData,
  validateSigninData,
  validateScanImage,
};
