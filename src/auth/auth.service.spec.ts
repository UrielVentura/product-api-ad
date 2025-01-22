import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const payload = { sub: 'test-user', username: 'adminApplyDigital' };
      const token = 'test-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = service.generateToken();

      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toBe(token);
    });
  });
});
