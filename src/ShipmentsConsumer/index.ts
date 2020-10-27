import App from './App';
import Core from '../Core/Core';

exports.handler = async event => {
  try {
    const app = new App(event);
    const request = app.getRequestService();
    const shipmentsConsumerService = app.getShipmentsConsumerService();

    await shipmentsConsumerService.process(request);
  } catch (error) {
    Core.logError(error?.message, error, event);
    throw error;
  }
};
