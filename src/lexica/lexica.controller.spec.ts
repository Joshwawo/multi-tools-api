import { Test, TestingModule } from '@nestjs/testing';
import { LexicaController } from './lexica.controller';
import { LexicaService } from './lexica.service';

describe('LexicaController', () => {
  let controller: LexicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LexicaController],
      providers: [LexicaService],
    }).compile();

    controller = module.get<LexicaController>(LexicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
