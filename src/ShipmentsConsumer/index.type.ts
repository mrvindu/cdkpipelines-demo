export interface INotificationItem {
  additionalData: {
    'modification.action': string;
  }
  amount:{
    currency: string;
    value: number;
  };
  eventCode: string;
  eventDate: string;
  merchantAccountCode: string;
  originalReference: string;
  paymentMethod: string;
  pspReference: string;
  reason: string;
  success: 'true' | 'false';
}

export interface IEvent {
  live: 'true' | 'false';
  notificationItems: { NotificationRequestItem: INotificationItem[] };
}
