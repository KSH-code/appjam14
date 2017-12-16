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
# /write
## request body
```
{
    id: String(token or 진짜아이디)
    writer: String(닉네임)
    title: String(제목)
    content: String(내용)
    content: String(내용)
    content: String(내용)
}
```