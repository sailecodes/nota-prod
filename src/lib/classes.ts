import { TServerActionErrorMetadata } from "./types";

export class UIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UIError";

    Object.setPrototypeOf(this, UIError.prototype);
  }
}

export class ServerActionError extends Error {
  public metadata?: TServerActionErrorMetadata;

  constructor(message?: string, metadata?: TServerActionErrorMetadata) {
    super(message);
    this.name = "ServerActionError";
    if (metadata) this.metadata = { ...metadata };

    Object.setPrototypeOf(this, ServerActionError.prototype);
  }
}
