const fallbackUrl = "https://kbmanilla06.github.io";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, "");
