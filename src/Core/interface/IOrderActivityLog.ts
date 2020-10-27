export default interface IOrderActivityLog {
  Comment: string;
  Type: string;
  User: string;
  LogData: { [prop: string]: any };
  UserId?: string;
}
