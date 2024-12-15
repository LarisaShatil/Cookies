import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {
  getCookie,
  setCookie,
} from "https://deno.land/x/hono@v3.12.11/helper.ts";

const app = new Hono();

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

// Cookie options for better security
const COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  secure: false, // Set to `true` if using HTTPS
  sameSite: "Strict",
};

app.get("/", (c) => {
  let name = getCookie(c, "name") ||null;

  return c.html(
    eta.render("index.eta", { name })
  );

});

app.post("/", async (c) => {
  const body = await c.req.parseBody();
  const name = body.name;

  // Validate name input
  if (!name) {
    return c.text("Name is required!", 400); // Bad request if name is missing
  }

  setCookie(c, "name", name, COOKIE_OPTIONS);

  return c.redirect("/");
});

export default app;
