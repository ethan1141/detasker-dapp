// const { links } = require("./metadata.js");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
// const { generateLink } = require("./pages/components/interfaces/ILink.js");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      let f = false;
      console.log(pathname);
      // switch (pathname) {
      //   case "/":
      //     await app.render(req, res, "/", query);
      //     f = true;
      //     break;
      //   case "/Jobs":
      //     await app.render(req, res, "/Jobs", query);
      //     f = true;
      //     break;
      //   case "/Acount":
      //     await app.render(req, res, "/Acount", query);
      //     f = true;
      //     break;
      //   case "/Account":
      //     await app.render(req, res, "/Account", query);
      //     f = true;
      //     break;
      //   case "/Account":
      //     await app.render(req, res, "/Account", query);
      //     f = true;
      //     break;
      //   case pathname.includes("/job/view"):
      //     await app.render(req, res, "/job/view", query);
      //     f = true;
      //     break;
      //   default:
      //     break;
      // }

      await app.render(req, res, pathname, query);
      f = true;
      // console.log(links);
      // for (let index = 0; index < links.length; index++) {
      //   const element = links[index];
      //   console.log("df");
      //   if (generateLink(element) === pathname) {
      //     await app.render(req, res, "/" + generateLink(element), query);
      //     f = true;
      //   }
      // }
      if (!f) {
        await handle(req, res, parsedUrl);
      }
      // }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
