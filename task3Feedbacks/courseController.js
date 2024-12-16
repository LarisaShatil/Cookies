import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import {
  getCookie
} from "https://deno.land/x/hono@v3.12.11/helper.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import * as courseService from "./courseService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const validator = z.object({
  course: z.string().min(4, "The course name should be a string of at least 4 characters."),
});

const showPageWithButtons = (c) => c.html(eta.render("index.eta"));

const showForm = async (c) => {

  return c.html(
    eta.render("courses.eta", { courses: await courseService.listCourses() })
  );
};

const showCourse = async (c) => {
  const courseId = c.req.param("courseId");
  const course = await courseService.getCourse(courseId);
  const feedbackHistory = getCookie(c, courseId) || false;

  if (feedbackHistory) {
    return c.html(
      eta.render("course.eta", { course, feedbackHistory }),
    );
  };

  return c.html(
    eta.render("course.eta", { course }),
  );
};

const createCourse = async (c) => {
  const body = await c.req.parseBody();
  const validationResult = validator.safeParse(body);

  if (!validationResult.success) {
    const courses = await courseService.listCourses();

    return c.html(
      eta.render("courses.eta", {
        ...body,
        errors: validationResult.error.format(),
        courses,
      })
    );
  };

  await courseService.createCourse(body);
  return c.redirect("/courses");
};

const deleteCourse = async (c) => {
  const courseId = c.req.param("courseId");
  await courseService.deleteCourse(courseId);

  return c.redirect("/courses");
};


export { showPageWithButtons, showForm, showCourse, createCourse, deleteCourse };