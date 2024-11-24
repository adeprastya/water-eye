const tf = require("@tensorflow/tfjs-node");
const { loadModel } = require("./loadModel");

const predict = async (image) => {
	try {
		const model = await loadModel();
		const tensorImage = tf.tensor(image); // base64 image

		// const prediction = model.predict(tensorImage);
		// const predictionData = prediction.dataSync();

		return {
			quality: "good",
			analysis: "Detailed analysis of the prediction result",
			recommendation: "Provide recommendations based on the prediction"
		};
	} catch (err) {
		console.error("Prediction error:", err);
		return false;
	}
};

module.exports = { predict };
