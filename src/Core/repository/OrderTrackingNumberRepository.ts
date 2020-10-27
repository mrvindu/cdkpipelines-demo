import BaseRepository from './BaseRepository';
import IOrderTrackingNumber from '../interface/IOrderTrackingNumber';
import TrackingEntity from '../entity/TrackingEntity';

export default class OrderTrackingNumberRepository extends BaseRepository {
  protected tableName = 'OrderTrackingNumbers';

  public async create(item: TrackingEntity): Promise<any> {
    return this.docClient
      .put({
        TableName: this.tableName,
        Item: this.buildItem(item),
      })
      .promise();
  }

  private buildItem(item: TrackingEntity): IOrderTrackingNumber {
    return {
      OrderId: item.getOrderId(),
      OrderShipmentLines: item.getOrderShipmentLines(),
      TrackingNumber: item.getTrackingNumber(),
      CarrierContainerId: item.getCarrierContainerId(),
      TrackingUrl: item.getTrackingUrl(),
      CreateDate: item.getCreateDate(),
      CreateTime: item.getCreateTime(),
    };
  }
}
