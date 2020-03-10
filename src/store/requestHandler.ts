import Axios from 'axios-observable';
import { AuthConfig } from './Config/config.reducer';

interface RequestProps {
  data?: any;
  headers?: any;
  params?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
}

interface RequestQueueItem {
  props: RequestProps;
  fn: (res: any) => any;
  errorHandler?: (error: any) => any;
}

class RequestHandler {
  _mainQueue: RequestQueueItem[] = [];
  _failedQueue: RequestQueueItem[] = [];

  constructor() {
    setInterval(() => {
      if (this._failedQueue.length) {
        // console.log('something faliled, retry needed!', this._failedQueue.pop()?.props.url);
      } else if (this._mainQueue.length) {
        const currentReq = this._mainQueue.shift();

        if (currentReq) this._makeRequest(currentReq);

        // console.log(this._mainQueue);
      }
    }, 500);
  }

  _makeRequest = (currentReq: RequestQueueItem) => {
    const { data, headers, params, method, url } = currentReq.props;
    const localAuth: AuthConfig = JSON.parse(localStorage.getItem('auth') || 'null');

    Axios.request({
      data, // при использовании spread оператора FormData не передается
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localAuth.accessToken}`,
        ...headers,
      },
      params,
      method,
      url,
    })
      .toPromise()
      .then(r => currentReq.fn(r.data))
      .catch(() => {
        this._failedQueue.push(currentReq);
      });
  };

  request = (props: RequestProps, fn: any) => {
    this._mainQueue.push({ props, fn });
  };
}

const rh = new RequestHandler();

export default rh;
