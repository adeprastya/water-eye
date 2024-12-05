const axios = require("axios");
const waterResult = require("./water-result.json");

const MODEL_BE_URL = process.env.MODEL_BE_URL;
if (!MODEL_BE_URL) {
	throw new Error("MODEL_BE_URL is not defined");
}

// const classifications = [
// 	"not-water",

// 	"black",
// 	"brown",
// 	"green",
// 	"blue",
// 	"yellow",
// 	"red",
// 	"transparent",

// 	"black-clear",
// 	"black-concentrated",
// 	"brown-clear",
// 	"brown-concentrated",
// 	"green-clear",
// 	"green-concentrated",
// 	"blue-clear",
// 	"blue-concentrated",
// 	"yellow-clear",
// 	"yellow-concentrated",
// 	"red-clear",
// 	"red-concentrated",
// 	"transparent-clear",
// 	"transparent-concentrated"
// ];

const predict = async (imageBase64) => {
	try {
		const response = await axios.post(
			MODEL_BE_URL + "/predict",
			{
				image: imageBase64
			},
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		const result = waterResult[response.data.prediction];

		return {
			...result,
			confidence: response.data.confidence
		};
	} catch (err) {
		console.error("Prediction error:", err);
		return false;
	}
};

module.exports = { predict };
