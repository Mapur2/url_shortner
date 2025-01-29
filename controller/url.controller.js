const Url = require("../model/url.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler")
const shortid = require("shortid");

const shortenUrl = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;
    if (originalUrl == null || originalUrl.length == 0 )
        throw new ApiError(400, "All fields are required");

    const shortId = shortid.generate(); // Convert to milliseconds

    const newUrl = await Url.create({
        shortId,
        originalUrl,
    })
    const urlData = await Url.findOne({ shortId });
    if(!urlData)
        throw new ApiError(500,"Server Error")
    return res.status(201).json(
        new ApiResponse(201, {
            shortUrl: `https://urlshortner-production-0cf2.up.railway.app/shorten/${shortId}`,
        },
            "Shortened url")
    )
})

const getUrl = asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const urlData = await Url.findOne({ shortId });

    if (!urlData)
        throw new ApiError(404, "Url not found")
    return res.redirect(urlData.originalUrl);
})

module.exports={getUrl,shortenUrl}