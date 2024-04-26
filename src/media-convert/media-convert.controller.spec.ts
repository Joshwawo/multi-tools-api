import { Test, TestingModule } from '@nestjs/testing';
import { MediaConvertController } from './media-convert.controller';
import { MediaConvertService } from './media-convert.service';

describe('MediaConvertController', () => {
  let controller: MediaConvertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaConvertController],
      providers: [MediaConvertService],
    }).compile();

    controller = module.get<MediaConvertController>(MediaConvertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
