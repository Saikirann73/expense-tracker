import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from './../shared/logger/logger-service';
import { ReceiptsRepository } from './..//database/repositories/receipts-repository';
import { ReceiptsService } from './receipts.service';

describe('ReceiptsService', () => {
  let service: ReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptsService,
        {
          provide: ReceiptsRepository,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            deleteMany: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            error: jest
              .fn()
              .mockImplementation((item: any) => Promise.resolve(true)),
            info: jest
              .fn()
              .mockImplementation((item: any) => Promise.resolve(true)),
            warn: jest
              .fn()
              .mockImplementation((item: any) => Promise.resolve(true)),
          },
        },],
    }).compile();

    service = module.get<ReceiptsService>(ReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
