const path = require("path");

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const serviceAccountPath = `${path.join(process.cwd(), "/")}${process.env.SERVICE_ACCOUNT_FILENAME}`;

module.exports = { GCP_PROJECT_ID, serviceAccountPath };
