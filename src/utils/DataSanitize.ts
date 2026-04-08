export class DataSanitize {
  private static readonly suspiciousPattern =
    /(--|;|\/\*|\*\/|'|xp_|exec|select|insert|delete|drop|update|union|script|<|>)/i;

  static sanitize<T extends Record<string, any>>(data: T): T {
    const sanitized = {} as T;

    for (const key in data) {
      const value = data[key];

      if (typeof value === "string") {
        const trimmed = value.trim();

        if (this.suspiciousPattern.test(trimmed)) {
          throw new Error(`Suspicious input detected in field: ${key}`);
        }

        sanitized[key as keyof T] = trimmed.replace(/['"\\]/g, "") as any;
      } else {
        sanitized[key as keyof T] = value;
      }
    }

    return sanitized;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }
}
