import * as dns from 'dns';

export const domainToIP = async (domain: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address) => {
      if (err) {
        reject(err);
      } else {
        resolve(address);
      }
    });
  });
};
