import express from "express";
import { selectSql, insertSql, deleteSql } from "../database/sql";

const router = express.Router();

let get_user_id = ""; // 유저 아이디 저장해주는 변수
let middle_data; // insert에서 받아온 값으로 PK를 찾기위해 중간에 넘겨줄 변수
let middle_data2; // delete에서 받아온 값으로 PK를 찾기위해 중간에 넘겨줄 변수

router.get('/', (req, res) => { // /에 접속하면 home에 연결해준다. (로그인 페이지)
    res.render('home');
});

router.get('/user', (req, res) => { // user 페이지 렌더링 (회원가입 페이지)
    res.render('user');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers(); // user 목록 select 문 함수로 불러오기
    let whoAmI = ''; // 접속한 계정 확인해줄 변수
    let checklogin = false; // 로그인을 했는지 확인해줄 변수

    users.map((user) => {
        if(vars.id === user.ID && vars.password === user.Password){ // 아이디 + 비밀번호가 일치할 때
            console.log('login success!');
            checklogin = true; // 로그인 성공

            get_user_id = vars.id; // 로그인 성공 시 사용자 아이디 저장

            console.log(get_user_id)
            if(vars.id === '12171786'){ // 관리자로 로그인 되었을 때
                whoAmI = 'admin';
            } else {
                whoAmI = 'user'; // 사용자로 로그인 되었을 때
            }
        }
    })

    if(checklogin && whoAmI === 'admin'){ // 관리자로 로그인 되었을 때
        res.redirect('/select'); // 관리자 조회 페이지로 이동
    } else if(checklogin && whoAmI === 'user'){ // 사용자로 로그인 되었을 때
        res.redirect('/login'); // 사용자 홈페이지로 이동
    } else{
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href = '/';</script>") // 로그인 실패시 알림 메시지 출력
    }
})

router.post('/user', (req, res) => { // 회원가입 페이지에서 받아온 값 삽입해주는 함수
    const vars = req.body;

        const data = {
            Id: vars.Id,
            Password: vars.Password,
            Phone: vars.Phone,
            Name: vars.Name
        }

    insertSql.setUser(data);
    res.redirect('/'); // 로그인 페이지로 연결
})

router.get('/login', async (req, res) => { // 로그인 완료 후 예약 홈페이지 띄우기

    res.render('login',{
        title: ("환영합니다, " + get_user_id + "님!") // 받아온 아이디로 환영 메시지 띄워주기
    });
});

router.get('/login/insert', async (req, res) => { // select 함수를 이용해서 reservation 뷰 테이블 값을 가져와서 예약에 필요한 정보 띄워주기
    const reserve = await selectSql.getreserve();

    res.render('logininsert',{
        title: ("예약하기"),
        reserve
    });
});

router.post('/login/insert', (req, res) => { // 삽입에 필요한 정보 가져와서 middle_data 변수에 넘겨주기
    const vars = req.body;

    const data = {
        Airline: vars.Airline,
        Date: vars.Date,
        D_airport: vars.D_airport,
        A_airport: vars.A_airport
    }

    middle_data = data;

    res.redirect('/login/insertconfirm'); // 예약 확정 페이지로 연결
})

router.get('/login/insertconfirm', async (req, res) => { // 삽입에 필요한 PK 얻고 사용자가 예약을 다시 한번 확인 후 확정 지을 수 있는 페이지 렌더링
    const middle = await selectSql.getmiddle(middle_data); // 사용자가 입력한 중간 값으로 PK 받아오기
    const seatnum = await selectSql.getSeatnum(middle_data); // 사용자가 입력한 중간 값으로 좌석 번호 받아오기

    res.render('logininsertconfirm',{
        title: ("예약 확인"),
        middle,
        seatnum
    });
});

router.post('/login/insertconfirm', (req, res) => { // 사용자가 확정 시 PK를 이용해서 삽입하기
    const vars = req.body;

    const data = { 
        Flight_number: vars.Flight_number,
        Leg_number: vars.Leg_number,
        Seat_number: vars.Seat_number
    }

    insertSql.setreserve(data, get_user_id, middle_data);
    res.redirect('/login/delete'); // 조회 페이지로 연결
})

router.get('/login/delete', async (req, res) => { // 조회 response 상수를 reserved 뷰 테이블 select 함수를 이용해서 값을 가져온다.
    const seat = await selectSql.getseats(get_user_id); 

    res.render('logindelete',{
        title: ("예약 조회 및 취소"),
        seat
    });
});

router.post('/login/delete', (req, res) => { // 사용자가 취소를 위해 입력한 값 PK를 받아오기 위해서 middle_data2로 넘겨주기
    const vars = req.body;

    const data = {
        Airline: vars.Airline,
        Date: vars.Date,
        D_airport: vars.D_airport,
        A_airport: vars.A_airport,
        Seat_number: vars.Seat_number
    }

    middle_data2 = data;

    res.redirect('/login/deleteconfirm'); // 취소 확정 페이지로 연결
})

router.get('/login/deleteconfirm', async (req, res) => { // 투플 삭제에 필요한 PK 얻고 사용자가 취소를 한번 더 확정 지을 수 있는 페이지 렌더링
    const middle = await selectSql.getmiddle(middle_data2); // 사용자가 입력한 중간 값으로 취소에 필요한 PK 받아오기

    res.render('logindeleteconfirm',{ 
        title: ("예약 취소"),
        middle
    });
});

router.post('/login/deleteconfirm', (req, res) => { // PK로 투플 삭제
    const vars = req.body;

    const data = {
        Flight_number: vars.Flight_number,
        Leg_number: vars.Leg_number
    }

    deleteSql.deletereserve(data, middle_data2);
    res.redirect('/login/delete'); // 조회 페이지로 연결
})

module.exports = router;