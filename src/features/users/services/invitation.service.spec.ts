import { Test, TestingModule } from '@nestjs/testing';
import { InvitationRequestService } from './invitation-request.service';

describe('InvitationService', () => {
  let service: InvitationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationRequestService],
    }).compile();

    service = module.get<InvitationRequestService>(InvitationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
