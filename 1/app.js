import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {
  getCookie,
  setCookie,
} from "https://deno.land/x/hono@v3.12.11/helper.ts";

const app = new Hono();

app.get("/", (c) => {
  let count = getCookie(c, "count");
  setCookie(c, "count", "1");
  return c.text(`Hello cookies! -- ${count}`);
});

Deno.serve(app.fetch);