import { Test, TestingModule } from '@nestjs/testing';
import { ConsentRegistryService } from './consent-registry.service';

describe('ConsentRegistryService', () => {
  let service: ConsentRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsentRegistryService],
    }).compile();

    service = module.get<ConsentRegistryService>(ConsentRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
