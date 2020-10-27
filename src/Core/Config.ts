import Core from './Core';

export default class Config {
  private readonly env = null;

  constructor(env) {
    this.env = env;
  }

  public get(name: string): string {
    return this.getEnvVariable(name);
  }

  public getBySsm(name): Promise<string> {
    const ssmName = this.getEnvVariable(name);

    return Core.getSsmClient().get(ssmName);
  }

  private getEnvVariable(name: string): string {
    if (this.env[name] === undefined) {
      throw new Error(`Environment variable "${name}" not found`);
    }

    return this.env[name];
  }
}
