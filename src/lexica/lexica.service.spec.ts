import { Test, TestingModule } from '@nestjs/testing';
import { LexicaService } from './lexica.service';

describe('LexicaService', () => {
  let service: LexicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LexicaService],
    }).compile();

    service = module.get<LexicaService>(LexicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
