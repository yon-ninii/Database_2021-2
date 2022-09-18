import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function(req, res) { // sql에 정의한 함수로 값을 불러와서 각 상수에 넣어준다.
    const Airport = await selectSql.getAirport(); // select 문을 함수로 실행시켜서 저장
    const Airplane = await selectSql.getAirplane(); // select 문을 함수로 실행시켜서 저장
    const Instance = await selectSql.getLeg_instance(); // select 문을 함수로 실행시켜서 저장

    res.render('select', { // 받아온 값 및 제목 select에 렌더링
        title: '공항 조회',
        title2: '항공기 조회',
        title3: '항공편 조회',
        Airport, 
        Airplane,
        Instance
    });
});

module.exports = router;