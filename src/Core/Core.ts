import { SSM, DynamoDB, StepFunctions } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import SQS from 'aws-sdk/clients/sqs';
import SNS from 'aws-sdk/clients/sns';
import SsmClient from './client/SsmClient';
import Config from './Config';
import StepFunctionClient from './client/StepFunctionClient';
import SnsClient from './client/SnsClient';
import SnsMock from '../../serverless/SnsMock';
import SqsClient from './client/SqsClient';
import RefundRepository from './repository/RefundRepository';
import OrderTrackingNumberRepository from './repository/OrderTrackingNumberRepository';

export default class Core {
  private static docClient: DocumentClient = null;

  private static cachedSsmClient = null;

  static parseEvent<T>(event): T {
    return typeof event === 'object' ? event : JSON.parse(event);
  }

  static log(...message): void {
    console.log('[INFO]', message);
  }

  static logError(message, error, event = {}): void {
    console.error('[ERROR]', message, error, event);
  }

  static getSsmClient(): SsmClient {
    if (Core.cachedSsmClient === null) {
      Core.cachedSsmClient = new SsmClient(new SSM());
    }

    return Core.cachedSsmClient;
  }

  static getRefundRepository(): RefundRepository {
    return new RefundRepository(Core.getDB());
  }

  static getOrderTrackingNumberRepository(): OrderTrackingNumberRepository {
    return new OrderTrackingNumberRepository(Core.getDB());
  }

  static isDevelopmentMode(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  static getConfig(): Config {
    return new Config(process.env);
  }

  static getDB() {
    if (this.docClient === null) {
      const options = {
        apiVersion: '2012-08-10',
        convertEmptyValues: true,
      };
      if (Core.isDevelopmentMode()) {
        // @ts-ignore
        options.endpoint = process.env.DYNAMODB_ENDPOINT;
      }
      this.docClient = new DynamoDB.DocumentClient(options);
    }

    return this.docClient;
  }

  static getStepFunctionClient() {
    return new StepFunctionClient(new StepFunctions());
  }

  static getSNS(): SNS {
    if (Core.isDevelopmentMode()) {
      return <SNS> new SnsMock();
    }

    return new SNS();
  }

  static getSnsClient() {
    return new SnsClient(this.getSNS());
  }

  static getSqs() {
    if (Core.isDevelopmentMode()) {
      return new SQS({
        endpoint: Core.getConfig().get('SQS_ENDPOINT'),
        apiVersion: '2012-11-05',
        region: 'us-east-1',
      });
    }

    return new SQS();
  }

  static getSqsClient() {
    return new SqsClient(this.getSqs());
  }

  static reset() {
    Core.docClient = null;
    Core.cachedSsmClient = null;
  }
}
