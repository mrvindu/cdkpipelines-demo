import { SQSEvent } from 'aws-lambda';
import Core from '../Core/Core';
import RequestService from './service/RequestService';
import ShipmentsConsumerService from './service/ShipmentsConsumerService';

export default class App {
  private readonly event: SQSEvent;

  constructor(event: SQSEvent) {
    this.event = Core.parseEvent<SQSEvent>(event);
  }

  public getShipmentsConsumerService(): ShipmentsConsumerService {
    return new ShipmentsConsumerService(Core.getStepFunctionClient());
  }

  public getRequestService(): RequestService {
    return new RequestService(this.event);
  }
}
