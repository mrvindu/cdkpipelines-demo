import { StartExecutionOutput } from 'aws-sdk/clients/stepfunctions';
import RequestService from './RequestService';
import StepFunctionClient from '../../Core/client/StepFunctionClient';
import { IShipmentsRecord } from '../../Core/interface/IShipmentsRecord';
import Core from '../../Core/Core';

export default class ShipmentsConsumerService {
  private stepFunctionClient: StepFunctionClient;

  constructor(stepFunctionClient: StepFunctionClient) {
    this.stepFunctionClient = stepFunctionClient;
  }

  public process(request: RequestService): Promise<StartExecutionOutput[]> {
    const results = request.getShipmentsRecords().map(shipment => this.invokeOrderStatusWorker(shipment));

    return Promise.all(results);
  }

  private invokeOrderStatusWorker(shipmentsRecord: IShipmentsRecord): Promise<StartExecutionOutput> {
    const params = {
      stateMachineArn: Core.getConfig().get('ORDER_STATUS_WORKER_ARN'),
      input: JSON.stringify(shipmentsRecord),
      name: 'Order-Status-Worker',
    };

    return this.stepFunctionClient.invoke(params);
  }
}
