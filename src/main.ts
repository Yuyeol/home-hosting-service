import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS 설정 (모든 클라이언트 접근 허용)
  app.enableCors({
    origin: '*', // 모든 출처 허용
    methods: ['GET', 'POST'],
    credentials: false, // 모든 출처를 허용할 때는 credentials를 false로 설정해야 함
  });

  // 정적 파일 서비스 설정
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 모든 네트워크 인터페이스에서 접속 허용 (외부 접속 가능)
  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
  console.log(`애플리케이션이 실행 중입니다: ${await app.getUrl()}`);
}
bootstrap();
