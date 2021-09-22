const express = require("express");
const router = express.Router();
const firebase = require("../firebase/index");
const firestoreLite = require("firebase/firestore/lite");
const { getFirestore, collection, getDocs } = firestoreLite;
const db = getFirestore(firebase);

const dummyJson = {
  name: "akash",
};

router.get("/", async (req, res) => {
  console.log("test GET log");
  const collectn = collection(db, "users");
  const docs = await getDocs(collectn);
  const list = docs.docs.map((doc) => doc.data());
  console.log(list);
  res.send(list)
  return JSON.stringify(list);
});
router.post("/", (req, res) => {
  console.log("test POST log");
});

module.exports = router;
