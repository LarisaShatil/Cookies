# COOKIES AND SESSIONS
! When you test applications that use cookies, it is meaningful to use the **incognito mode** in browsers. When you restart testing an application, you can also restart the browser window. This way, you will have a new session. Another option is to use curl and add the necessary cookie headers into requests.

## Cookie options for better security
const COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  secure: false, // Set to `true` if using HTTPS
  sameSite: "Strict",
};

## Hono's library
Hono has a helper library at https://deno.land/x/hono@v3.12.11/helper.ts, which provides functionality for setting, getting, and deleting cookies.

## Commands
### start the server
deno run --allow-net --allow-read --unstable-kv --watch app-run.js
### curl commands
curl -v localhost:8000
curl -v -H "Cookie: count=1" localhost:8000 (setting value of Cookie)