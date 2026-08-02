type RateLimitRecord = {
  timestamps: number[];
};

const rateLimits = new Map<string, RateLimitRecord>();

/**
 * Sliding window IP-based rate limiter (in-memory).
 * Returns true if the client is rate limited, false otherwise.
 * 
 * @param ip The client's IP address.
 * @param limit The maximum number of requests allowed in the window.
 * @param windowMs The sliding window duration in milliseconds.
 */
export function isRateLimited(
  ip: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  let record = rateLimits.get(ip);

  if (!record) {
    record = { timestamps: [] };
    rateLimits.set(ip, record);
  }

  // Filter out timestamps that are outside the sliding window
  record.timestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (record.timestamps.length >= limit) {
    return true;
  }

  record.timestamps.push(now);
  return false;
}
