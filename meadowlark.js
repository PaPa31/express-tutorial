const express = require("express");
const expressHandlebars = require("express-handlebars");

const handlers = require("./lib/handlers");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        " press Ctrl-C to terminate."
    ); // with ";" when clicked, an error appears: malformed url invalid port or port number
  });
} else {
  module.exports = app;
}
