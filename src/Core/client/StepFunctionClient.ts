import { StepFunctions } from 'aws-sdk';
import { StartExecutionOutput } from 'aws-sdk/clients/stepfunctions';
import Core from '../Core';
import { IStepFunctionParameters } from '../interface/IStepFunctionParameters';

export default class StepFunctionClient {
  private stepFunction;

  constructor(stepFunction: StepFunctions) {
    this.stepFunction = stepFunction;
  }

  public invoke(params: IStepFunctionParameters): Promise<StartExecutionOutput> {
    return this.stepFunction.startExecution(params).promise()
      .then(data => {
        Core.log(`Executed: ${params.name}`);

        return data;
      })
      .catch(error => {
        Core.logError(`Execution error: ${params.name}`, error);
        throw error;
      });
  }
}
