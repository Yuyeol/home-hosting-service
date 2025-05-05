import { Controller, Get } from '@nestjs/common';
import { ApiService, ServerInfo } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // 서버 정보 API 엔드포인트
  @Get('info')
  getServerInfo(): ServerInfo {
    return this.apiService.getServerInfo();
  }
}
