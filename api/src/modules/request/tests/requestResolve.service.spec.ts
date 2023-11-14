// FILEPATH: /C:/Users/Jon/Documents/GitHub/secur-scan/api/src/modules/request/subservices/requestResolve.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RequestResolveService } from '../subservices/requestResolve.service';
import * as dns from 'dns';

jest.mock('dns');

describe('RequestResolveService', () => {
  let service: RequestResolveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestResolveService],
    }).compile();

    service = module.get<RequestResolveService>(RequestResolveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return IP address for valid domain', async () => {
    const mockLookup = dns.lookup as jest.MockedFunction<typeof dns.lookup>;
    mockLookup.mockImplementation((domainName, callback) =>
      callback(null, '127.0.0.1', null),
    );

    await expect(service.resolveDNS('localhost')).resolves.toBe('127.0.0.1');
    expect(mockLookup).toHaveBeenCalledWith('localhost', expect.any(Function));
  });

  it('should throw error for invalid domain', async () => {
    const mockLookup = dns.lookup as jest.MockedFunction<typeof dns.lookup>;
    mockLookup.mockImplementation((domainName, callback) =>
      callback(new Error('Invalid domain'), null, null),
    );

    await expect(service.resolveDNS('invalid')).rejects.toThrow(
      'Invalid domain',
    );
    expect(mockLookup).toHaveBeenCalledWith('invalid', expect.any(Function));
  });
});
