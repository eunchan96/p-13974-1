package com.back.domain.member.member.dto;

import com.back.domain.member.member.entity.Member;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

public record MemberDto(
        @NonNull int id,
        @NonNull LocalDateTime createDate,
        @NonNull LocalDateTime modifyDate,
        @NonNull String name,
        @NonNull boolean isAdmin,
        @NonNull String profileImgUrl
) {
    public MemberDto(int id, LocalDateTime createDate, LocalDateTime modifyDate, String name, boolean isAdmin, String profileImgUrl) {
        this.id = id;
        this.createDate = createDate;
        this.modifyDate = modifyDate;
        this.name = name;
        this.isAdmin = isAdmin;
        this.profileImgUrl = profileImgUrl;
    }

    public MemberDto(Member member) {
        this(
                member.getId(),
                member.getCreateDate(),
                member.getModifyDate(),
                member.getName(),
                member.isAdmin(),
                member.getProfileImgUrlOrDefault()
        );
    }
}