import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function(req, res) { // sql에 정의한 함수로 값을 불러와서 각 상수에 넣어준다.
    const department = await selectSql.getDepartment(); // select 문을 함수로 실행시켜서 저장
    const student = await selectSql.getStudent(); // select 문을 함수로 실행시켜서 저장

    res.render('select', { // 테이블을  출력
        title: 'IT 공대',
        title2: '학생 목록',
        department, // 저장 시켜둔 변수
        student // 저장 시켜둔 변수
    });
});

module.exports = router;