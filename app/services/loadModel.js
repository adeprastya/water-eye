const tf = require("@tensorflow/tfjs-node");

// let model = null;
let model = true;

const loadModel = async () => {
	if (!model) {
		try {
			console.log("\n__LOADING MODEL__");

			// model = await tf.loadLayersModel("file://path_to_your_model/tfjs_model/model.json");

			console.log("Model loaded successfully!\n");
		} catch (err) {
			console.error("Error loading model:", err);
			throw new Error("Failed to load model");
		}
	}
	return model;
};

module.exports = { loadModel };
