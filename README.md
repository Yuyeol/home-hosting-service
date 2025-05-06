# 홈 호스팅 서비스 (Home Hosting Service)

개인 컴퓨터를 활용한 웹 호스팅 서비스 구축 프로젝트입니다. 클라우드 호스팅 서비스를 사용하지 않고, 직접 서버와 네트워크를 구성하여 외부에서 접근 가능한 웹 서비스를 만들었습니다.

## 프로젝트 소개

이 프로젝트는 다음과 같은 기능을 구현합니다:

- NestJS 백엔드 서버를 통한 API 제공
- React 프론트엔드를 통한 사용자 인터페이스
- 단일 서버 배포 구조로 통합된 웹 서비스
- DDNS를 활용한 고정 도메인 제공
- 포트포워딩을 통한 외부 접속 설정

## 기술 스택

### 백엔드

- NestJS (TypeScript)
- Express.js
- RESTful API

### 프론트엔드

- React
- TypeScript
- Vite

### 네트워크/인프라

- DuckDNS (DDNS 서비스)
- 포트포워딩
- Cron (자동화 작업)

## 시스템 아키텍처

```
인터넷 ─────────► 공유기 (포트포워딩: 8000) ─────────► 로컬 PC (172.30.1.95:8000)
    │                                                      │
    │                                                      │
    │                                                      ▼
    │                                                  NestJS 서버
    │                                                      │
    │                                                      │
    ▼                                                      ▼
DuckDNS ◄───── 자동 업데이트 ───────────────────────► 정적 파일 (React 빌드)
                (cron 작업)                              API 엔드포인트
```

## 프로젝트 구조

```
home-hosting-service/         # 백엔드 서버 (NestJS)
├── src/
│   ├── main.ts               # 서버 설정
│   ├── app.module.ts         # 앱 모듈
│   └── api/                  # API 관련 파일
│       ├── api.controller.ts # API 엔드포인트
│       └── api.service.ts    # 비즈니스 로직
├── public/                   # 정적 파일 (React 빌드)
└── README.md                 # 이 파일

home-hosting-client/          # 프론트엔드 (React)
├── src/
│   ├── App.tsx               # 메인 컴포넌트
│   └── ...
├── package.json              # 프로젝트 설정 및 배포 스크립트
└── ...

Documents/duckdns/           # DDNS 설정
└── duck.sh                  # DuckDNS 업데이트 스크립트
```

## 주요 기능 구현

### 백엔드 API

```typescript
// 서버 정보 반환 API
@Get('info')
getServerInfo(): ServerInfo {
  return {
    name: 'Home Hosting Service',
    status: 'running',
    uptime: process.uptime(),
    timestamp: new Date(),
  };
}
```

### 프론트엔드

```typescript
// 서버 정보 가져오기
const fetchServerInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/api/info`);
    const data = await response.json();
    setServerInfo(data);
  } catch (err) {
    setError('서버 정보를 불러오는 중 오류가 발생했습니다.');
  }
};
```

### 배포 자동화

```json
// package.json
"scripts": {
  "deploy": "npm run build && cp -r dist/* ../home-hosting-service/public/"
}
```

### DDNS 업데이트

```bash
# DuckDNS 업데이트 스크립트
echo url="https://www.duckdns.org/update?domains=$DOMAIN&token=$TOKEN&ip=" | curl -k -o ~/Documents/duckdns/duck.log -K -
```

## 설치 및 실행 방법

### 백엔드 서버 실행

```bash
cd home-hosting-service
npm install
npm run start:dev  # 개발 모드
```

### 프론트엔드 개발

```bash
cd home-hosting-client
npm install
npm run dev        # 개발 모드
```

### 배포 (통합)

```bash
cd home-hosting-client
npm run deploy     # 빌드 및 백엔드 public 폴더로 복사
cd ../home-hosting-service
npm run start      # 프로덕션 모드로 서버 실행
```

## 네트워크 설정

### 포트포워딩

1. 공유기 관리 페이지 접속
2. 포트포워딩 설정 메뉴 찾기
3. 내부 IP, 내부/외부 포트 설정

### DDNS 설정

1. DuckDNS 가입 및 도메인 설정
2. 토큰 획득 및 스크립트 설정
3. Cron 작업 등록: `(crontab -l 2>/dev/null; echo "*/5 * * * * /Users/jeong-yuyeol/Documents/duckdns/duck.sh") | crontab -`

## 학습한 개념

- 내부 IP vs 공인 IP의 차이점
- 포트포워딩의 원리와 설정
- DDNS의 필요성과 구성
- 정적 파일 서비스 설정
- CORS 설정
- 배포 자동화

## 미래 개선 계획

- HTTPS 설정 (Let's Encrypt)
- Nginx 리버스 프록시 설정
- 서버 상태 모니터링 추가
- 로그 수집 및 분석 시스템 구축
