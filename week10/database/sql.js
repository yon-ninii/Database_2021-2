import mysql from "mysql2";

const pool = mysql.createPool( // 내 데이터베이스 정보 입력하기
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week10',
        password: 'yongmin0',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

const promisePool = pool.promise();

export const selectSql = { // select * 해주는 쿼리를 작성해줄 함수 작성.
    getUsers : async () => {
        const [rows] = await promisePool.query(`select * from user`); // user table

        return rows
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`); // department table

        return rows
    },
    getStudent : async () => {
        const [rows] = await promisePool.query(`select * from student`); // student table

        return rows
    },
}

export const deleteSql = { // 삭제해줄 함수 작성

    deleteDepartment : async (data) => { // data를 통해 전달 받은 Dnumber 값을 가진 행 삭제
        console.log('deleteSql.deleteDepartment : ', data.Dnumber);
        const sql = `delete from department where Dnumber = ${data.Dnumber}`; // 쿼리문 작성
        
        await promisePool.query(sql);
    },
    deleteStudent : async (data) => { // data를 통해 전달 받은 Ssn 값을 가진 행 삭제
        console.log('deleteSql.deleteStudent : ', data.Ssn);
        const sql = `delete from student where Ssn = ${data.Ssn}`; // 쿼리문 작성
        
        await promisePool.query(sql);
    },
}