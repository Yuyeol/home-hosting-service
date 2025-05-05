import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS 설정 (React 클라이언트의 접근 허용)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // 정적 파일 서비스 설정
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 모든 네트워크 인터페이스에서 접속 허용 (외부 접속 가능)
  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
  console.log(`애플리케이션이 실행 중입니다: ${await app.getUrl()}`);
}
bootstrap();
