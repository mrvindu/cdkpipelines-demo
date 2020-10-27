import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

import PutItemInputAttributeMap = DocumentClient.PutItemInputAttributeMap;

export default interface IOrderTrackingNumber extends PutItemInputAttributeMap {
  OrderId: string;
  OrderShipmentLines: {
    ProductQtyOrdered: string;
    ProductQtyShipped: string;
    ProductSku: string;
  }[];
  TrackingNumber: string;
  CarrierContainerId: string;
  TrackingUrl: string;
  CreateDate: string;
  CreateTime: string;
}
