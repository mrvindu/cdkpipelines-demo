import SNS, { PublishResponse } from 'aws-sdk/clients/sns';
import Core from '../Core';

export default class SnsClient {
  private sns: SNS;

  constructor(sns: SNS) {
    this.sns = sns;
  }

  public publish(topicArn: string, message: any): Promise<PublishResponse> {
    const params = {
      Message: JSON.stringify(message),
      TopicArn: topicArn,
    };

    return this.sns
      .publish(params)
      .promise()
      .then(res => {
        Core.log(`Published to SNS, topicArn: ${topicArn}`);

        return res;
      })
      .catch(error => {
        Core.logError('SNS publish failed', error, message);
        throw error;
      });
  }
}
