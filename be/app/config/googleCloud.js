const path = require("path");

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const SERVICE_ACCOUNT_FILENAME = process.env.SERVICE_ACCOUNT_FILENAME;

if (!GCP_PROJECT_ID) {
	throw new Error("Environment variable GCP_PROJECT_ID is not defined");
}

if (!SERVICE_ACCOUNT_FILENAME) {
	throw new Error("Environment variable SERVICE_ACCOUNT_FILENAME is not defined");
}

const serviceAccountPath = path.join(process.cwd(), SERVICE_ACCOUNT_FILENAME);

module.exports = { GCP_PROJECT_ID, serviceAccountPath };
