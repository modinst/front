# Modinst's Readme

작업물 관리 하는 방법

업스트림 등록하기
git remote add upstream https://github.com/modinst/modinst_front.git
로 현재 main을 업스트림으로 등록합니다 ( 원격 저장소의 싱크를 맞추면 관리하기 편리해집니다. )

git remote -v
로 업스트림 등록 여부를 확인합니다.

git branch -{이름}
으로 브랜치를 만들어 기능 구현을시작합니다. -> 이슈 단위로 끊어서 하는게 좋습니다.

switch 한 뒤

git pull upstream main
으로 원격 저장소 메인의 변경사항을 맞춰 브랜치의 싱크를 맞춥니다.(초기 설정 완료)

기능 단위별로 commit을 합니다.
/ 커밋 메시지 작성법 : 컨벤션을 앞에 두고 기능 구현 이름을 작성후 메시지에 상세 구현내용을 작성합니다.

/  예시 : Feat: userPage 구현
  이후 메시지

/ 다음 컨벤션을 따르면 좋습니다.
  커밋 컨벤션 : 

/  Feat	새로운 기능을 추가. 

/  Fix	버그 수정. 

/  Design	CSS 등 사용자 UI 디자인 변경. 

/  Refactor 프로덕션 코드 리팩토링. 

/  Update 잡다한 업데이트 . 


기능 구현이 마무리 되면 이후 Main으로 Pull Request를 보내 병합 요청을 합니다.

Code Review후 Main에 Merge합니다.

작업을 반복합니다.






