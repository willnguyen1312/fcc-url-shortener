// Mongoose Model - Url
const UrlShortener = require("../models/url");
const uuidv5 = require("uuid/v5");

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://fcc-url-shortener-nam.herokuapp.com/"
    : "http://localhost:3000/";

function validateURL(url) {
  // Checks to see if it is an actual url
  // Regex from https://gist.github.com/dperini/729294
  var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return regex.test(url);
}

function handleRedirect(ctx, data) {
  if (!data) {
    ctx.body = "Sorry, nothing found in my database";
  } else {
    ctx.redirect(data._id);
  }
}

async function hello(ctx) {
  const url = ctx.url.substring(5);
  if (!validateURL(url)) {
    const data = await UrlShortener.findOne({
      shortNum: ctx.url.substring(ctx.url.lastIndexOf("/") + 1)
    });
    handleRedirect(ctx, data);
  } else {
    const random = uuidv5(url, uuidv5.URL).substring(0, 7);
    const storeData = {
      _id: url,
      shortNum: random
    };
    await UrlShortener.create(storeData);

    const dataBack = {
      original_url: url,
      short_url: `${SERVER_URL}new/${random}`
    };
    ctx.body = dataBack;
  }
}

module.exports = {
  hello
};
