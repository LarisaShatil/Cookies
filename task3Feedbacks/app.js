import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as courses from "./courseController.js";
import * as feedbacks from "./feedbacks.js";

const app = new Hono();

app.get("/courses", courses.showForm);
app.get("/courses/:courseId", courses.showCourse);
app.get("courses/:courseId/feedbacks/:value", feedbacks.showCount);

app.post("/courses",courses.createCourse);
app.post("/courses/:courseId/delete", courses.deleteCourse);
app.post("courses/:courseId/feedbacks/:value", feedbacks.incrementAndGetCount);

export default app;