import {
  setCookie,
} from "https://deno.land/x/hono@v3.12.11/helper.ts";

const getCount = async (courseId, value) => {
  const kv = await Deno.openKv();
  const count = await kv.get(["feedbacks", courseId, value]);

  return count.value ?? 0;
};

const incrementCount = async (courseId, value) => {
  let count = await getCount(courseId, value);
  count++;
  await setCount(courseId, value, count);
};

const setCount = async (courseId, value, count) => {
  const kv = await Deno.openKv();
  await kv.set(["feedbacks", courseId, value], count);
};

const showCount = async (c) => {
  const courseId = c.req.param("courseId");
  const value = c.req.param("value");

  return c.text(`Feedback ${value}: ${await getCount(courseId, value)}`);
};

const incrementAndGetCount = async (c) => {
  const value = c.req.param("value");
  const courseId = c.req.param("courseId");
  
  await incrementCount(courseId, value);
  setCookie(c, courseId, true);

  return c.redirect(`/courses/${courseId}`);
};

export { showCount, incrementAndGetCount };