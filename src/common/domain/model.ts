import { IdTool } from '../utils/Id-tool';

export abstract class Model<T = Record<string, any>> {
  readonly id: string;
  protected props: T = {} as T;

  protected constructor(id?: string) {
    this.id = id || IdTool.generate();
  }

  toJson(): ({ id: string } & T) | any {
    return {
      ...this.props,
      id: this.id,
    };
  }

  toPersistence(): ({ id: string } & T) | any {
    return {
      ...this.props,
      id: this.id,
    };
  }
}
