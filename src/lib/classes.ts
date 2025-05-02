import { TServerActionErrorMetadata } from "./types";

export class ServerActionError extends Error {
  public metadata?: TServerActionErrorMetadata;

  constructor(message?: string, metadata?: TServerActionErrorMetadata) {
    super(message);
    this.name = "ServerActionError";
    if (metadata) this.metadata = { ...metadata };

    Object.setPrototypeOf(this, ServerActionError.prototype);
  }
}
