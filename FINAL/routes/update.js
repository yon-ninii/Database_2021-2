import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();


router.get('/', async (req, res) => { // 관리자 수정 페이지 렌더링
    res.render('update', {
        title: "관리자 수정 페이지입니다."
    });
});

// 기존의 입력 값 불러오기
router.get('/airport', async (req, res) => {
    const Airport = await selectSql.getAirport(); // select 문을 함수로 실행시켜서 airport 저장

    res.render('updateairport', { // updateairport에 받아온 값 렌더링
        title: "공항 업데이트",
        Airport
    });
});

// 기존의 입력 값 불러오기
router.get('/airplane', async (req, res) => {
    const Airplane = await selectSql.getAirplane(); // select 문을 함수로 실행시켜서 저장
    const Airplane_type = await selectSql.getAirplane_type();

    res.render('updateairplane', { // updateairport에 받아온 값 렌더링
        title: "항공기 업데이트",
        Airplane,
        Airplane_type
    });
});

// 기존의 입력 값 불러오기
router.get('/leg_instance', async (req, res) => {
    const Instance = await selectSql.getLeg_instance(); // select 문을 함수로 실행시켜서 저장
    const Airplane = await selectSql.getAirplane(); // select 문을 함수로 실행시켜서 저장

    res.render('updateLeg', { // updateairport에 받아온 값 렌더링
        title: "항공편 업데이트",
        Instance,
        Airplane
    });
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/airport', async (req, res) => {
    const vars = req.body; // 받아온 데이터 저장

    const data = { 
        Airport_code: vars.Airport_code,
        Name: vars.Name,
        City: vars.City
    }

    await updateSql.updateAirport(data); // 받아온 데이터 업데이트 쿼리로 넘겨주기

    res.redirect('/select'); // localhost:3000/select
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/airplane', async (req, res) => {
    const vars = req.body; // 받아온 데이터 저장

    const data = {
        Airplane_id: vars.Airplane_id,
        Airplane_type: vars.Airplane_type
    }
    await updateSql.updateAirplane(data); // 받아온 데이터 업데이트 쿼리로 넘겨주기

    res.redirect('/select'); // localhost:3000/select
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/leg_instance', async (req, res) => {
    const vars = req.body; // 받아온 데이터 저장

    const data = {
        Flight_number: vars.Flight_number,
        Leg_number: vars.Leg_number,
        Date: vars.Date,
        Airplane_id: vars.Airplane_id
    }
    await updateSql.updateLeg_instance(data); // 받아온 데이터 업데이트 쿼리로 넘겨주기

    res.redirect('/select'); // localhost:3000/select
});

module.exports = router;