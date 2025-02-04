import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(): string {
    const payload = { sub: 'test-user', username: 'adminApplyDigital' };
    return this.jwtService.sign(payload);
  }
}
