/** Timeout, retry, and a small fixed-window rate limit for provider calls. */

export class RateLimitError extends Error {
  constructor() {
    super("rate limited");
    this.name = "RateLimitError";
  }
}

export class RateLimiter {
  private hits: number[] = [];

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
  ) {}

  take(now = Date.now()): void {
    this.hits = this.hits.filter((stamp) => now - stamp < this.windowMs);
    if (this.hits.length >= this.max) throw new RateLimitError();
    this.hits.push(now);
  }

  reset(): void {
    this.hits = [];
  }
}

export function withTimeout<T>(work: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms);
  });
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer));
}

export async function withRetry<T>(
  work: () => Promise<T>,
  options: { retries: number; backoffMs: number; retryOn: (error: unknown) => boolean },
): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await work();
    } catch (error) {
      last = error;
      if (attempt === options.retries || !options.retryOn(error)) break;
      await new Promise((resolve) => setTimeout(resolve, options.backoffMs * 2 ** attempt));
    }
  }
  throw last;
}
