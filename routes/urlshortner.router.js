const express = require('express');
const { getUrl, shortenUrl } = require('../controller/url.controller');
const router = express.Router()

router.route("/:shortId").get(getUrl);
router.route("/create").post(shortenUrl);

module.exports = router
