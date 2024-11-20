const path = require("path");

const serviceAccountPath = `${path.join(process.cwd(), "/")}local.backend-client-key.json`;

module.exports = serviceAccountPath;
