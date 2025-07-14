package com.back.domain.member.member.dto;

import com.back.domain.member.member.entity.Member;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

public record MemberWithUsernameDto(
        @NonNull int id,
        @NonNull LocalDateTime createDate,
        @NonNull LocalDateTime modifyDate,
        @NonNull String name,
        @NonNull String username
) {
    public MemberWithUsernameDto(int id, LocalDateTime createDate, LocalDateTime modifyDate, String name, String username) {
        this.id = id;
        this.createDate = createDate;
        this.modifyDate = modifyDate;
        this.name = name;
        this.username = username;
    }

    public MemberWithUsernameDto(Member member) {
        this(
                member.getId(),
                member.getCreateDate(),
                member.getModifyDate(),
                member.getName(),
                member.getUsername()
        );
    }
}