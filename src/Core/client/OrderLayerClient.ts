// @ts-ignore
import { OMS } from 'plt-layer';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import IOrderLineStatus from '../interface/IOrderLineStatus';
import IOrderLayer from '../interface/IOrderLayer';
import IOrderActivityLog from '../interface/IOrderActivityLog';

export default class OrderLayerClient {
  public updateOrderLineStatus(orderId: string, updateOrderLineStatuses: IOrderLineStatus[]): Promise<void> {
    return OMS.Order.updateOrderlineStatus(orderId, updateOrderLineStatuses);
  }

  public updateStatus(orderId: string, status: string): Promise<void> {
    return OMS.Order.updateOrderStatus(orderId, status);
  }

  public removeAttributes(orderId: string, attributes: string[]): Promise<void> {
    return OMS.Order.removeOrderAttributes(orderId, attributes);
  }

  public getByOrderNumber(orderNumber: string): Promise<IOrderLayer> {
    return OMS.Order.getByOrderNumber(orderNumber);
  }

  public addLog(orderId: string, log: IOrderActivityLog): Promise<PutItemOutput> {
    return OMS.Log.add(orderId, log);
  }
}
