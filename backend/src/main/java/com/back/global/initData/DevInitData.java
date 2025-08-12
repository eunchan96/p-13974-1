package com.back.global.initData;

import com.back.standard.util.Ut;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("dev")
@Configuration
@RequiredArgsConstructor
public class DevInitData {
    @Bean
    ApplicationRunner devInitDataApplicationRunner() {
        return args -> {
            Ut.cmd.runAsync(
                    "npx{{DOT_CMD}}",            // npx 명령어 실행
                    "--yes",                            // 자동으로 'yes' 응답
                    "--package", "typescript",          // 타입스크립트 패키지
                    "--package", "openapi-typescript",  // openapi-typescript 패키지
                    "openapi-typescript",               // 실제 실행할 명령어
                    "http://localhost:8080/v3/api-docs/apiV1", // OpenAPI 문서 URL
                    "-o", "../frontend/src/lib/backend/apiV1/schema.d.ts" // 출력 파일 경로
            );
        };
    }
}