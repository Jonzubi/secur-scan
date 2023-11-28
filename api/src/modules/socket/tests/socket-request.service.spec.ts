import { Test, TestingModule } from '@nestjs/testing';
import { SocketRequestService } from '../socket-request.service';

describe('SocketRequestService', () => {
  let service: SocketRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketRequestService],
    }).compile();

    service = module.get<SocketRequestService>(SocketRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
