import { Injectable } from '@nestjs/common';

// 간단한 데이터 인터페이스 정의
export interface ServerInfo {
  name: string;
  status: string;
  uptime: number;
  timestamp: Date;
}

@Injectable()
export class ApiService {
  // 서버 정보를 반환하는 메서드
  getServerInfo(): ServerInfo {
    return {
      name: 'Home Hosting Service',
      status: 'running',
      uptime: process.uptime(), // 서버 가동 시간(초)
      timestamp: new Date(),
    };
  }
}
