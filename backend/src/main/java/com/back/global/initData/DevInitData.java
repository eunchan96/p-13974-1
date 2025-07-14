package com.back.global.initData;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Profile("dev")
@Configuration
@RequiredArgsConstructor
public class DevInitData {
    @Bean
    ApplicationRunner devInitDataApplicationRunner() {
        return args -> {
            try {
                boolean isWindows = System.getProperty("os.name").toLowerCase().contains("win");

                // 실행할 명령어 설정
                ProcessBuilder builder = new ProcessBuilder(
                        "npx" + (isWindows ? ".cmd" : ""),      // 윈도우에서는 .cmd 명시
                        "--package", "typescript",         // 타입스크립트 패키지
                        "--package", "openapi-typescript", // openapi-typescript 패키지
                        "openapi-typescript",              // 실제 실행할 명령어
                        "http://localhost:8080/v3/api-docs/apiV1", // OpenAPI 문서 URL
                        "-o", "../frontend/src/lib/backend/apiV1/schema.d.ts" // 출력 파일 경로
                );

                // 에러 스트림도 출력 스트림과 함께 병합
                builder.redirectErrorStream(true);

                // 프로세스 시작
                Process process = builder.start();

                // 결과 출력
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line); // 결과 한 줄씩 출력
                    }
                }

                // 종료 코드 확인
                int exitCode = process.waitFor();
                System.out.println("종료 코드: " + exitCode);
            } catch (IOException | InterruptedException e) {
                e.printStackTrace(); // 에러 출력
            }
        };
    }
}