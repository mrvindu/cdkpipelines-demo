import Core from '../Core';

export default class SsmClient {
  private ssm;

  private readonly cache: Map<string, string>;

  constructor(ssm) {
    this.ssm = ssm;
    this.cache = new Map<string, string>();
  }

  public get(name: string): Promise<string> {
    if (this.cache.has(name)) {
      return Promise.resolve(this.cache.get(name));
    }

    if (Core.isDevelopmentMode()) {
      return Promise.resolve(process.env[`LOCAL_SSM_[${name}]`]);
    }

    return this.ssm.getParameter({
      Name: name,
      WithDecryption: true,
    }).promise().then(ssmData => {
      const value = ssmData.Parameter.Value;
      this.cache.set(name, value);

      return value;
    });
  }
}
