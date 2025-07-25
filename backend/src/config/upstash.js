import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();
const redis = Redis.fromEnv();

await redis.set("foo", "bar");
await redis.get("foo");

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  prefix: "@upstash/ratelimit",
  /* analytics: true, // Activate to use analytics */
});
