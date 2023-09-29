import { Injectable } from '@nestjs/common';
import { get, RequestOptions } from 'https';

@Injectable()
export class HttpService {
  async get(url: string, options: RequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      get(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });

        res.on('error', (err) => {
          reject(err);
        });
      });
    });
  }
}
