const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine")
const webRoute = require("./routes/web");
const orderRoute = require("./routes/order");

let app = express();

//Config view Engine
viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config web routes
app.use(webRoute);
app.use(orderRoute);

// Verify that the callback came from Facebook.
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('App is running at the port: ' + port);
})