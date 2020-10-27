import BaseRepository from './BaseRepository';
import RefundEntity from '../entity/RefundEntity';
import IRefund from '../interface/IRefund';

export default class RefundRepository extends BaseRepository {
  protected tableName = 'Refunds';

  public async create(item: RefundEntity): Promise<any> {
    return this.docClient
      .put({
        TableName: this.tableName,
        Item: this.buildRefundItem(item),
      })
      .promise();
  }

  private buildRefundItem(item: RefundEntity): IRefund {
    return {
      Id: item.getID(),
      RefundId: item.getRefundID(),
      OrderNumber: item.getOrderNumber(),
      PaymentMethod: item.getPaymentMethod(),
      RefundType: item.getRefundType(),
      FromReorder: item.getFromReorder(),
      SourceRequest: item.getSourceRequest(),
      RefundShipping: item.getRefundShipping(),
      Source: item.getSource(),
      OrderLines: item.getOrderLines().map(orderLine => ({
        Data: orderLine.getData(),
        KeyTable: orderLine.getKeyTable(),
        LineTotal: orderLine.getLineTotal(),
        ProductSku: orderLine.getProductSku(),
        Quantity: orderLine.getQuantity(),
      })),
      IsException: item.getIsException(),
      IsProcessed: item.getIsProcessed(),
      CreatedAt: item.getCreatedAt(),
      RefundedAt: item.getRefundedAt(),
    };
  }
}
