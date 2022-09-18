import express from "express";
import { deleteSql, selectSql } from "../database/sql";

const router = express.Router();


router.get('/', async (req, res) => { // 관리자 삭제 페이지 렌더링

    res.render('delete',{
        title: "관리자 삭제 페이지 입니다."
    });
});

router.get('/airport', async (req, res) => { // 공항 response 상수를 select 함수를 이용해서 값을 가져온다.
    const Airport = await selectSql.getAirport();

    res.render('deleteairport',{
        title: "공항 삭제",
        Airport
    });
});

router.get('/airplane', async (req, res) => { // 항공기 response 상수를 select 함수를 이용해서 값을 가져온다.
    const Airplane = await selectSql.getAirplane();

    res.render('deleteairplane',{
        title: "항공기 삭제",
        Airplane
    });
});

router.get('/leg_instance', async (req, res) => { // 항공편 response 상수를 select 함수를 이용해서 값을 가져온다.
    const Instance = await selectSql.getLeg_instance();

    res.render('deleteLeg',{
        title: "항공편 삭제",
        Instance
    });
});

router.post('/airport', async (req, res) => { // 삭제 쿼리로 받아온 데이터 넘겨주기
    const vars = req.body;
    console.log(vars);

    const data = {
        Airport_code: vars.Airport_code
    }

    await deleteSql.deleteAirport(data);

    res.redirect('/delete/airport');
});

router.post('/airplane', async (req, res) => { // 삭제 쿼리로 받아온 데이터 넘겨주기
    const vars = req.body;
    console.log(vars);

    const data = {
        Airplane_id: vars.Airplane_id
    }

    await deleteSql.deleteAirplane(data);

    res.redirect('/delete/airplane');
});

router.post('/leg_instance', async (req, res) => { // 삭제 쿼리로 받아온 데이터 넘겨주기
    const vars = req.body;
    console.log(vars);

    const data = {
        Flight_number: vars.Flight_number,
        Leg_number: vars.Leg_number,
        Date: vars.Date
    }

    await deleteSql.deleteLeg_instance(data);

    res.redirect('/delete/leg_instance');
});

module.exports = router;