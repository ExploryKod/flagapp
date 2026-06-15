export type RestCountriesErrorDisplay = {
  status: number;
  statusLabel: string;
  apiMessages: string[];
  title: string;
  hint: string;
};

function statusLabel(status: number): string {
  if (status === 403) return 'Forbidden';
  if (status === 401) return 'Unauthorized';
  if (status === 429) return 'Too Many Requests';
  if (status === 400) return 'Bad Request';
  if (status >= 500) return 'Server Error';
  if (status === 0) return 'Configuration';
  return 'Error';
}

function defaultTitle(status: number): string {
  if (status === 403) return 'API request limit reached';
  if (status === 401) return 'API authentication failed';
  if (status === 429) return 'Too many requests';
  if (status === 0) return 'Countries data unavailable';
  if (status >= 500) return 'Countries service unavailable';
  return 'Unable to load countries';
}

function defaultHint(status: number): string {
  if (status === 403) {
    return 'Your REST Countries monthly quota may be exhausted. Requests are paused until your billing cycle resets or you upgrade your plan.';
  }
  if (status === 401) {
    return 'Check that REST_COUNTRIES_API_KEY is valid and active.';
  }
  if (status === 0) {
    return 'The server is missing REST_COUNTRIES_API_KEY. Add it to your environment variables.';
  }
  return 'Please try again in a moment. If the problem persists, check the REST Countries service status.';
}

export class RestCountriesApiError extends Error {
  readonly status: number;
  readonly apiMessages: string[];
  readonly title: string;
  readonly hint: string;

  constructor(status: number, apiMessages: string[], title?: string, hint?: string) {
    const messages = apiMessages.length > 0 ? apiMessages : [statusLabel(status)];
    super(messages.join(' '));
    this.name = 'RestCountriesApiError';
    this.status = status;
    this.apiMessages = messages;
    this.title = title ?? defaultTitle(status);
    this.hint = hint ?? defaultHint(status);
  }

  toDisplay(): RestCountriesErrorDisplay {
    return {
      status: this.status,
      statusLabel: statusLabel(this.status),
      apiMessages: this.apiMessages,
      title: this.title,
      hint: this.hint,
    };
  }

  static isRestCountriesApiError(error: unknown): error is RestCountriesApiError {
    return error instanceof RestCountriesApiError;
  }

  /** For Next.js error.tsx where only Error.message/name cross the boundary. */
  static fromSerialized(error: Error): RestCountriesErrorDisplay | null {
    if (error.name !== 'RestCountriesApiError') return null;
    try {
      const parsed = JSON.parse(error.message) as RestCountriesErrorDisplay;
      if (parsed?.title && Array.isArray(parsed.apiMessages)) return parsed;
    } catch {
      /* fall through */
    }
    return {
      status: 0,
      statusLabel: 'Error',
      apiMessages: [error.message || 'Unknown REST Countries error'],
      title: defaultTitle(0),
      hint: defaultHint(0),
    };
  }

  /** Serialize for client error boundaries. */
  serializeForBoundary(): RestCountriesApiError {
    this.message = JSON.stringify(this.toDisplay());
    return this;
  }
}

export function toRestCountriesApiError(error: unknown): RestCountriesApiError | null {
  if (RestCountriesApiError.isRestCountriesApiError(error)) return error;
  return null;
}
