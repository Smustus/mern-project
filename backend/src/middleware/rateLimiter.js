import { ratelimit } from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Maybe?
    const identifier = userId || req.ip;
    const { success, limit, remaining, pending } = await ratelimit.limit(
      identifier
    );

    // Await background analytics (if activated in upstash.js)
    await pending;

    if (!success) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later.",
        limit,
        remaining,
      });
    }

    return next();
  } catch (error) {
    console.error("Rate limiter error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error in rate limiter.",
    });
  }
};
