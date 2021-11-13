import express from "express";
import { deleteSql, selectSql } from "../database/sql";

const router = express.Router();

router.get('/department', async (req, res) => { // 부서 response 상수를 select 함수를 이용해서 값을 가져온다.
    const department = await selectSql.getDepartment();

    res.render('deleteDepartment',{
        title: "부서 삭제 기능",
        department
    });
});

router.get('/student', async (req, res) => { // 학생 response 상수를 select 함수를 이용해서 값을 가져온다.
    const student = await selectSql.getStudent();

    res.render('deleteStudent',{
        title: "학생 삭제 기능",
        student
    });
});

router.post('/department', async (req, res) => { 
    console.log('delete router : ', req.body.delBtn); 

    const data = {
        Dnumber : req.body.delBtn, // 삭제 버튼을 통해 가져온다.
    };
    await deleteSql.deleteDepartment(data); // 함수에 데이터로 넘겨준다.

    res.redirect('/delete/department');
});

router.post('/student', async (req, res) => { // 
    console.log('delete router : ', req.body.delBtn2);

    const data = {
        Ssn : req.body.delBtn2, // 2번 버튼을 통해 가져온다
    };
    await deleteSql.deleteStudent(data); // 함수에 데이터로 넘겨준다.

    res.redirect('/delete/student');
});

module.exports = router;