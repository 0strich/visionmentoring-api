module.exports = {
  apps: [
    {
      // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
      name: "visionmentoring-api",
      // pm2로 실행될 파일 경로
      script: "./bin/www",
      watch: false,
      instances: 1, // 0으로 설정시 CPU 코어 수 만큼 프로세스 생성
      log_date_format: "YYYY-MM-DD HH:mm Z",
      exec_mode: "cluster", // 클러스터 모드
      // 개발환경시 적용될 설정 지정
      env: {
        // "PORT": 443,
        NODE_ENV: "production",
      },
      // 배포환경시 적용될 설정 지정
      env_production: {
        // "PORT": 443,
        NODE_ENV: "production",
      },
    },
  ],
};
