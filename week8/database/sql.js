import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'week8',
    password: 'dilab1234',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
  getEmployee : async () => {
    const [rows] = await promisePool.query(`select * from employee`);
    console.log(rows)
    return rows
  },
  getDepartment : async () => {
    const [rows] = await promisePool.query(`select * from department`);

    return rows
  },
}

// insert query
export const insertSql = {
  // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
  setEmployee : async (data) => { 
    const sql = `insert into employee values (
      "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}", "${data.Bdate}", 
      "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}" )`;

      await promisePool.query(sql);
  },

  setDepartment : async (data) => {
    const sql = `insert into department values (
      "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}" )`;

      await promisePool.query(sql);
  },
}

// update query
export const updateSql = {
  updateEmployee : async () => {
    // where 조건을 만족하는 행에 대해서 salary 수정
    const sql = `update employee set salary = 500 where Minit = "F"`;
    await promisePool.query(sql);
    
  },

  updateDepartment : async (data) => {
    const sql = `update department set dname = "${data.Dname}" where Dnumber = 0`;
    await promisePool.query(sql);

  },
}