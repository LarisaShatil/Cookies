import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {
  getSignedCookie,
  setSignedCookie,
} from "https://deno.land/x/hono@v3.12.11/helper.ts";

const app = new Hono();
const secret = "secret";

app.get("/", async (c) => {
  let count = await getSignedCookie(c, secret, "count") ?? 0;
  count = Number(count) + 1;
  await setSignedCookie(c, "count", `${count}`, secret, {
    path: "/",
  });
  return c.text(`Hello cookies! -- ${count}`);
});

Deno.serve(app.fetch);