import { v4 as uuidV4 } from 'uuid';

export class UuidTool {
  static generate(): string {
    return uuidV4();
  }
}

export class IdTool {
  static generate(): string {
    return UuidTool.generate();
  }
}
