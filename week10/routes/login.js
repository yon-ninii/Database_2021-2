import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => { // /에 접속하면 home에 연결해준다.
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers(); // user 목록 select 문 함수로 불러오기
    let whoAmI = ''; // 접속한 계정 확인해줄 변수
    let checklogin = false; // 로그인을 했는지 확인해줄 변수

    //for(let i = 0; i < users.length; i++){
    //    if(vars.id === users[i].id && vars.password ===users.[i].password)
    //}

    users.map((user) => {
        if(vars.id === user.Id && vars.password === user.Password){ // 아이디 + 비밀번호가 일치할 때
            console.log('login success!');
            checklogin = true; // 로그인 성공
            if(vars.id === 'admin'){ // 관리자로 로그인 되었을 때
                whoAmI = 'admin';
            } else {
                whoAmI = 'user'; // 사용자로 로그인 되었을 때
            }
        }
    })

    if(checklogin && whoAmI === 'admin'){ // 관리자로 로그인 되었을 때
        res.redirect('/delete/department'); // 부서 삭제 페이지로 이동
    } else if(checklogin && whoAmI === 'user'){ // 사용자로 로그인 되었을 때
        res.redirect('/select'); // 목록 출력 페이지로 이동
    } else{
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href = '/';</script>") // 로그인 실패시 알림 메시지 출력
    }
})

module.exports = router;