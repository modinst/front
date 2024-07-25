
<div align="center">
  <img src="https://github.com/user-attachments/assets/8c7b97e3-6c5d-4f61-b1d2-3dd8eb3d4e3e" alt="Login" width="300">
</div>

# ModInst

> Module + Instrument : Instrument Track Sharing Platform

<br>
<br>

## Team

- [강건](https://www.notion.so/a9f5fe76226a458b976db96edcffcf20?pvs=21)

> [geon314159 - Overview](https://github.com/geon314159)

- [김철호](https://www.notion.so/8d3b608466734ba6b418aa5e50564218?pvs=21)

> [Cheoroo - Overview](https://github.com/Cheoroo)

<br>
<br>

## Tech Stack

- **Server - `Kcloud`**
- **Frontend - `React`**
- **Backend - `Node.js + MongoDB`**

<br>
<br>

## Detail
### Login Page

<div align="center">
  <img src="https://github.com/user-attachments/assets/09ace4d2-cf8a-4388-93f6-4d784264ed76" alt="Login" width="600">
</div>

- 기본적인 로그인 및 회원 가입기능 구현.
- 서버 측 `authenticateUser` 미들웨어를 통해, 유저 권한이 필요한 api에서 활용.
    
<br>
<br>    

### My Page

<div align="center">
  <img src="https://github.com/user-attachments/assets/a9c401f3-d622-4003-9865-378187b96e9a" alt="Login" width="600">
</div>

- 마이 페이지에는 자신이 소유한 트랙을 확인할 수 있음.
- 레코딩을 통해 새로운 트랙을 등록할 수 있음 (Metronome 참고).

<br>
<br>

### Group Page

<div align="center">
  <img src="https://github.com/user-attachments/assets/9664161e-5e85-495d-aedc-e7d27cbab3ef" alt="Login" width="600">
</div>

- 그룹 페이지에는 여러 레코드를 포함하며 각각을 더 자세히 확인할 수 있음.
- 그룹 추가가 가능하며, 본인이 포함된 그룹만 들어갈 수 있음.
- 포함되지 않은 그룹에서는 참여 요청을 보낼 수 있음 (DB 및 api 상으로는 구현 완료, 프론트와 연결되지 않은 기능).

<br>
<br>

### Record Page

<div align="center">
  <img src="https://github.com/user-attachments/assets/9d933faa-c2e3-4547-a290-578989cc5dc1" alt="Login" width="600">
</div>

- **트랙 선택 모달**:
    - `TrackSelectionModal` 컴포넌트는 `getUserTracks` API를 호출하여 사용자의 트랙 목록을 불러옴.
    - 트랙 목록은 `tracks` 상태에 저장되고, 사용자는 목록에서 트랙을 선택하여 추가할 수 있음.
    - `onTrackSelect` 함수는 선택된 트랙을 상위 컴포넌트로 전달.
- **다중 음원 재생**:
    - `fetchAndPlaySelectedAudio` 함수는 선택된 트랙들의 `title`을 사용하여 오디오 파일을 서버에서 가져와 재생.
    - `Promise.all`을 사용하여 비동기적으로 모든 트랙 파일을 가져와 `Audio` 객체를 생성.
    - 각 `Audio` 객체를 `audioElements` 배열에 저장하고, 이를 통해 동시 재생이 가능.
    - `audioElements.forEach(audio => audio.play())`를 호출하여 모든 트랙을 동시에 재생.

<br>
<br>

### Metronome

<div align="center">
  <img src="https://github.com/user-attachments/assets/b92df4ad-909e-4aba-a1f6-693e4e1ededc" alt="Login" width="600">
</div>

- **메트로놈 시작**:
    - `isRecording` 상태가 `true`가 되면 메트로놈 작동을 시작하며 이는 녹음과 별개의 스트림으로 동작.
    - `setInterval`을 사용해 `bpm`에 맞춘 간격으로 메트로놈 소리를 재생. 이때 `player.current.start()`를 호출하여 소리를 재생.
    - `audioContextRef`와 `destRef`를 통해 오디오 스트림을 설정. `MediaRecorder`를 생성하여 오디오 스트림을 녹음.
- **박자 카운트와 색상 변경**:
    - `setCount`와 함께 박자를 카운트하고, 이를 기반으로 `circleColors` 상태를 업데이트하여 화면에 표시되는 원의 색상을 변경.
    - 카운트 4 이상이 되면 `setShouldStartRecording`을 `true`로 설정하여 녹음을 시작하도록 트리거.
- **메트로놈 정지**:
    - `isRecording` 상태가 `false`가 되면 메트로놈이 작동을 중지.
    - `clearInterval`을 통해 간격 타이머를 제거하여 메트로놈 소리가 더 이상 재생되지 않도록 함.
    - `MediaRecorder`의 `stop` 메서드를 호출하여 녹음을 중지.
    - `audioBlob`을 URL로 변환하여 `audioUrl` 상태에 저장하고, `uploadAudio` 함수를 호출하여 서버에 업로드.

<br>
<br>

## DB Design

- https://dbdiagram.io/d/MadCamp_Week_4-6688239b9939893dae2a1a62

<div align="center">
  <img src="https://github.com/user-attachments/assets/05e44644-b502-4d48-ad70-655745ba60e6" alt="Login" width="800">
</div>
    
<br>
<br>

    
### APIs & Codes

- authenticateUser
- isGroupMember
- isGroupLeader
- /register
- /login
- /logout
- /upload
- /records/:recordId/tracks
- /groups
- /users/:userId/tracks
- /groups/:groupId/records
- /groups/:groupId/join-requests
- /uploads
- /uploads/:filename
- /groups/:groupId/members
- /groups/:groupId/join-requests/:requestId
- /records/:recordId
- /tracks/:trackId
- /groups/:groupId
