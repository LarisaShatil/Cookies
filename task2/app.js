import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {
  getSignedCookie,
  setSignedCookie,
} from "https://deno.land/x/hono@v3.12.11/helper.ts";
const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const sessionCounts = new Map();
const app = new Hono();
const secret = "secret";


const getAndIncrementCount = (sessionId) => {
  let count = sessionCounts.get(sessionId) ?? 0;
  count++;
  sessionCounts.set(sessionId, count);
  return count;
};

app.get("/", async (c) => {
  const sessionId = await getSignedCookie(c, secret, "sessionId") ?? crypto.randomUUID();
  await setSignedCookie(c, "sessionId", sessionId, secret, {
    path: "/",
  });
  const count = getAndIncrementCount(sessionId);

  // console.log("count", count);
  // console.log("sessionId: ", sessionId);
  return c.html(
    eta.render("index.eta", { count })
  );
});

export default app;
