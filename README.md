# /login (post)  
## request body
```
{
    id: String(token > 0 ? 토큰값 : 진짜아이디)
    pw: String(token > 0 ? 빈거 보내도 됨 : 진짜비밀번호)
    token: Integer(0 or n > 0)
}
```
## response data
```
    성공 : 200
    {
        id: String
        name: String
    }
```
```
    실패 : 400
```
# /register (post)
## request body
```
{
    id: String(token > 0 ? 토큰값 : 진짜아이디)
    pw: String(token > 0 ? 빈거 보내도 됨 : 진짜비밀번호)        
    token: Integer(0 or n > 0)
    name: String(닉네임)
    schoolCode: Integer(학교 번호)
}
```
## response
```
    200이면 성공
```
```
{
    error: bool(true면 에러 false면 성공)
    error_msg: String(에러 메세지)
}
```
# /schoolList (get)
## request body
```
{
    schoolName: String(학교이름 (세명))
}
```
## response
```
{
    no: Integer(학교코드)
    name: String(학교이름)
    plcae: String(학교지역)
}
```
# /write (post)
## request body
```
{
    id: String(token or 진짜아이디)
    writer: String(닉네임)
    title: String(제목)
    content: String(내용)
    subject: String(과목)
}
file {
    img: file
}
```
## response
```
{
    error: bool
    error_msg: String(에러시 메세지)
}
```
```
    status 200 성공
```
# /
## request
```

```
## response
```
{
    list:[{
        idx: Integer()
        content: String(글 내용)
        writer: String(작성자 닉네임)
        check: Integer(채택을 했는가 ? 0 : 1)
        subject: String(과목)
        created_date: String(작성자 닉네임)
        img: Integer(있으면 1 없으면 0)
        commentCount: 댓글 개수
    }]
}
```
# /board/:idx (get) 댓글 불러오기
## request
## response
```
{
    list: [{
        content: String(내용)
        writer: String(작성자 닉네임)
        check: Integer(0 기본 1 채택됨)
        created_date: String(날짜)
    }]
}
```
# /board/:idx (post) 댓글 작성
## request
```
{
    content: String(내용)
    writer: String(작성자 닉네임)
}
```
## response
```
    200 성공
```
```
    400 실패
```
# /board/:idx/:commentIdx (post) 댓글 채택
## request
```
{
    postWriter: String(글 작성자 닉네임)
}
```
## response
```
    200 성공
```
```
    400 실패
```
# /pdf (post) pdf저장
## request
```
{
    schoolName: String(학교 이름)
    name: String(이름)
    id: String(이름)
}
```
## response
```
    200 성공
```
```
    400 실패
```