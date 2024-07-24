<div align="center">
  <img src="" alt="Login" width="600">
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

- 내용

<br>
<br>

### My Page

- 내용

<br>
<br>

### Group Page

- 내용

<br>
<br>

### Metronome

1. **메트로놈 시작**:
    - `isRecording` 상태가 `true`가 되면 메트로놈 작동을 시작하며 이는 녹음과 별개의 스트림으로 동작.
    - `setInterval`을 사용해 `bpm`에 맞춘 간격으로 메트로놈 소리를 재생. 이때 `player.current.start()`를 호출하여 소리를 재생.
    - `audioContextRef`와 `destRef`를 통해 오디오 스트림을 설정. `MediaRecorder`를 생성하여 오디오 스트림을 녹음.

<br>
<br>
    
2. **박자 카운트와 색상 변경**:
    - `setCount`와 함께 박자를 카운트하고, 이를 기반으로 `circleColors` 상태를 업데이트하여 화면에 표시되는 원의 색상을 변경.
    - 카운트 4 이상이 되면 `setShouldStartRecording`을 `true`로 설정하여 녹음을 시작하도록 트리거.

<br>
<br>

3. **메트로놈 정지**:
    - `isRecording` 상태가 `false`가 되면 메트로놈이 작동을 중지.
    - `clearInterval`을 통해 간격 타이머를 제거하여 메트로놈 소리가 더 이상 재생되지 않도록 함.
    - `MediaRecorder`의 `stop` 메서드를 호출하여 녹음을 중지.
    - `audioBlob`을 URL로 변환하여 `audioUrl` 상태에 저장하고, `uploadAudio` 함수를 호출하여 서버에 업로드.

<br>
<br>

## DB Design

- https://dbdiagram.io/d/MadCamp_Week_4-6688239b9939893dae2a1a62
    
<br>
<br>

    
### APIs & Codes

- isAuthenticated
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
