const tf = require("@tensorflow/tfjs-node");

// let model = null;
let model = true;

const loadModel = async () => {
	if (!model) {
		try {
			console.log("\n__LOADING MODEL__\n");

			model = await tf.loadLayersModel("file://tfjs_model/model.json");

			console.log("\n__MODEL LOADED__\n");
		} catch (err) {
			console.error("Error loading model:", err);
			throw new Error("Failed to load model");
		}
	}
	return model;
};
loadModel();

module.exports = { loadModel };
