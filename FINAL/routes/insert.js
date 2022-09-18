
import express from "express";
import { insertSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => { // 관리자 삽입 페이지 렌더링
    res.render('insert');
});

router.post('/', (req, res) => { // 업데이트 쿼리 실행해주는 함수
    const vars = req.body;
    const var_length = Object.keys(req.body).length; // 받아온 데이터 개수 저장

    if (var_length == 3) { // 3개면 공항
        const data = {
            Airport_code: vars.Airport_code,
            Name: vars.Name,
            City: vars.City
        };

        insertSql.setAirport(data);
    } else if(var_length == 2){ // 2개면 항공기
        const data = {
            Airplane_id: vars.Airplane_id,
            Airplane_type: vars.Airplane_type
        };
        
        insertSql.setAirplane(data);
    } else {
        const data = { // 4개면 항공편
            Flight_number: vars.Flight_number,
            Leg_number: vars.Leg_number,
            Date: vars.Date,
            Airplane_id: vars.Airplane_id
        };

        insertSql.setLeg_instance(data);
    }

    res.redirect('/select');
})

module.exports = router;