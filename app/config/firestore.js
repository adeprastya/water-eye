const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

const usersRef = firestore.collection("users");

module.exports = { firestore, usersRef };
