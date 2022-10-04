const express = require("express");
const expressHandlebars = require("express-handlebars");
const fortune = require("./lib/fortune");

const app = express();

// configure Handlebars view engine
// TypeError: expressHandlebars is not a function
// Workaround took from here: https://stackoverflow.com/a/72824228
app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;

const handlers = require("./lib/handlers");

app.get("/", handlers.home);

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  )
);
