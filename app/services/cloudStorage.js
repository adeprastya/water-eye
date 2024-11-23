const { Storage } = require("@google-cloud/storage");
const { GCP_PROJECT_ID, serviceAccountPath } = require("../config/googleCloud");

const BUCKET_NAME = process.env.GCS_BUCKET_NAME;

if (!BUCKET_NAME) {
	throw new Error("GCS_BUCKET_NAME is not defined");
}

const storage = new Storage({
	projectId: GCP_PROJECT_ID,
	keyFilename: serviceAccountPath
});

const bucket = storage.bucket(BUCKET_NAME);

const storeScanImage = async (scanId, image) => {
	try {
		// Prepare the file name for the image (you can customize this as needed)
		const fileName = `scans/${scanId}-${Date.now()}.png`;

		// If the image is in base64 format, we need to convert it to a buffer
		let buffer;
		if (image.startsWith("data:image")) {
			// Extract the base64 content from the data URI
			const base64Data = image.split(";base64,").pop();
			buffer = Buffer.from(base64Data, "base64");
		} else {
			// If the image is already a binary buffer, use it as is
			buffer = image;
		}

		// Reference to the GCS bucket and file
		const file = bucket.file(fileName);

		// Upload the image to Google Cloud Storage
		await file.save(buffer, {
			contentType: "image/png" // Assuming PNG, modify based on the actual image format
		});

		// Get the public URL of the uploaded file
		const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

		return imageUrl;
	} catch (err) {
		console.error("Error storing image in GCS:", err.message);
		return false;
	}
};

module.exports = { storage, bucket, storeScanImage };
