const express = require("express");
const { searchTutor } = require("../controller/searchController");

const router = express.Router();

router.get("/searchTutor", searchTutor);

module.exports = router;