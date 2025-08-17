package com.back.domain.member.member.dto;

import com.back.domain.member.member.entity.Member;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemberDto {
    private final int id;
    private final LocalDateTime createDate;
    private final LocalDateTime modifyDate;
    private final String name;
    private final boolean isAdmin;
    private final String profileImgUrl;

    public MemberDto(Member member) {
        id = member.getId();
        createDate = member.getCreateDate();
        modifyDate = member.getModifyDate();
        name = member.getName();
        isAdmin = member.isAdmin();
        profileImgUrl = member.getProfileImgUrlOrDefault();
    }
}