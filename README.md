# 모임모임

http://moimmoim.com  
동호회 회원을 모집하는 플랫폼 사이트입니다.  
관심 동호회를 추가하거나 가입 신청을 할 수 있으며, 마이페이지를 통해 해당 목록을 확인할 수 있습니다.  
- 프론트엔드 : https://github.com/dv-jamie/moimmoim_client

</br>

## 1. 제작 기간 & 참여 인원

- 2022년 2월 ~ 2022년 03월 (약 1개월)
- 개인 프로젝트

</br>

## 2. 사용 기술

### Back-end
  - Node.js
  - Express.js
  - Nginx
  - MySQL

### Front-end
  - React.js
  - Javascript
  - HTML5
  - CSS3

</br>

## 3. ERD 설계

![](https://user-images.githubusercontent.com/90839019/168699698-04f2675d-080d-427f-a2fd-161e2f15c26a.jpg)

</br>

## 5. 아키텍처 구성도

![](https://user-images.githubusercontent.com/90839019/168701810-7841ff98-8a38-4e6e-a6d9-7243a33b4473.jpg)

</br>

## 4. API 명세

| Index | Method  | URI                | Description |
| ----- | ------- | ------------------ | ----------- |
| 1     | POST    | /user/login        | 로그인 |
| 2     | POST    | /user/join         | 회원가입 |
| 3     | GET     | /user/mypage       | 마이페이지 |
| 4     | POST    | /user/{id}/likes   | 관심 목록 추가 |
| 5     | DELETE  | /user/{id}/likes   | 관심 목록 삭제 |
| 6     | GET     | /clubs             | 전체 모임 조회 |
| 7     | GET     | /clubs/{id}        | 유저별 모임 조회 |
| 8     | POST    | /apply             | 모임 가입 신청 |
