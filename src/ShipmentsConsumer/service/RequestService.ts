import { SQSEvent } from 'aws-lambda';
import { IShipmentsRecord } from '../../Core/interface/IShipmentsRecord';

export default class RequestService {
  private readonly event;

  constructor(event: SQSEvent) {
    this.event = event;
  }

  public getShipmentsRecords(): IShipmentsRecord[] {
    return this.event.Records.map(record => {
      return JSON.parse(record.body);
    });
  }
}
