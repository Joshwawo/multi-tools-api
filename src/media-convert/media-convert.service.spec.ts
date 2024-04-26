import { Test, TestingModule } from '@nestjs/testing';
import { MediaConvertService } from './media-convert.service';

describe('MediaConvertService', () => {
  let service: MediaConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaConvertService],
    }).compile();

    service = module.get<MediaConvertService>(MediaConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
