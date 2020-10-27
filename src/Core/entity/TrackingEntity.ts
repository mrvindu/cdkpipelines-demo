export default class TrackingEntity {
  private orderId = '';

  private orderShipmentLines: {
    ProductQtyOrdered: string;
    ProductQtyShipped: string;
    ProductSku: string;
  }[] = [];

  private trackingNumber = '';

  private carrierContainerId = '';

  private trackingUrl = '';

  private createDate = '';

  private createTime = '';

  public getOrderId(): string {
    return this.orderId;
  }

  public setOrderId(value: string) {
    this.orderId = value;
  }

  public getOrderShipmentLines(): any[] {
    return this.orderShipmentLines;
  }

  public addOrderShipmentLine(qtyOrdered: string, qtyShipped: string, sku: string) {
    this.orderShipmentLines.push({
      ProductQtyOrdered: qtyOrdered,
      ProductQtyShipped: qtyShipped,
      ProductSku: sku,
    });
  }

  public getTrackingNumber(): string {
    return this.trackingNumber;
  }

  public setTrackingNumber(value: string) {
    this.trackingNumber = value;
  }

  public getCarrierContainerId(): string {
    return this.carrierContainerId;
  }

  public setCarrierContainerId(value: string) {
    this.carrierContainerId = value;
  }

  public getTrackingUrl(): string {
    return this.trackingUrl;
  }

  public setTrackingUrl(value: string) {
    this.trackingUrl = value;
  }

  public getCreateDate(): string {
    return this.createDate;
  }

  public setCreateDate(value: string) {
    this.createDate = value;
  }

  public getCreateTime(): string {
    return this.createTime;
  }

  public setCreateTime(value: string) {
    this.createTime = value;
  }
}
