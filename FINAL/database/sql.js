import mysql from "mysql2";

const pool = mysql.createPool( // 내 데이터베이스 정보 입력하기
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'airline',
        password: 'yongmin0',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

const promisePool = pool.promise();

export const selectSql = { // select * 해주는 쿼리를 작성해줄 함수 작성.
    getUsers : async () => {
        const [rows] = await promisePool.query(`select * from user`) // user table

        return rows
    },
    getseats : async (data) => { // reserved 뷰 테이블에서 예약 조회에 필요한 값 불러오기
        const [rows] = await promisePool.query(`select date, scheduled_departure_time, scheduled_arrival_time, departure_airport_code,
        arrive_airport_code, airline, fare, seat_number from reserved where user_id = "${data}"`) 

        return rows
    },
    getAirport : async () => {
        const [rows] = await promisePool.query(`select * from airport`) // airport table

        return rows
    },
    getAirplane : async () => {
        const [rows] = await promisePool.query(`select * from airplane`) // airplane table

        return rows
    },
    getAirplane_type : async () => {
        const [rows] = await promisePool.query(`select * from airplane_type`) // flight_leg table

        return rows
    },
    getLeg_instance : async () => {
        const [rows] = await promisePool.query(`select * from leg_instance`) // leg_instance table

        return rows
    },
    getreserve : async () => { // reservation 뷰 테이블에서 예약할 때 필요한 정보 불러오기
        const [rows] = await promisePool.query(`select * from reservation`) 

        return rows
    },
    getmiddle : async (data) => { // 예약할 때와 취소할 때 정보를 넘겨받기 위해 필요한 중간 값 middle 뷰 테이블에서 불러오기 (PK를 찾아오는 쿼리 문)
        const [rows] = await promisePool.query(`select date, flight_number, leg_number from middle where airline = "${data.Airline}"
        and date = "${data.Date}" and arrive_airport_code = ${data.A_airport} and departure_airport_code = ${data.D_airport}`) 

        return rows
    },
    getSeatnum : async (data) => { // 예약할 때 자동으로 정해지는 좌석 번호 불러오기 (선착순으로 정해짐)
        const [rows] = await promisePool.query(`select (Max_seats - available_seats + 1) as seat_number 
        from reservation where airline = "${data.Airline}" and date = "${data.Date}"
        and arrive_airport_code = ${data.A_airport} and departure_airport_code = ${data.D_airport}`) 

        return rows
    },
}

export const deleteSql = { // 삭제해줄 함수 작성

    deleteAirport : async (data) => { // data를 통해 전달 받은 공항 코드 값을 가진 행 삭제
        console.log('deleteSql.deleteAirport : ', data.Airport_code);
        const sql = `delete from Airport where Airport_code = ${data.Airport_code}`; // 쿼리문 작성
        
        await promisePool.query(sql);
    },
    deleteAirplane : async (data) => { // data를 통해 전달 받은 항공기 번호 값을 가진 행 삭제
        console.log('deleteSql.deleteAirplane : ', data.Airplane_id);
        const sql = `delete from Airplane where Airplane_id = ${data.Airplane_id}`; // 쿼리문 작성
        
        await promisePool.query(sql);
    },
    deleteLeg_instance : async (data) => { // data를 통해 전달 받은 항공편 값을 가진 행 삭제
        console.log('deleteSql.deleteInstance : ', data);
        const sql = `delete from Leg_instance where flight_number = ${data.Flight_number} 
                    and leg_number = ${data.Leg_number} and date = '${data.Date}'`; // 쿼리문 작성
        
        await promisePool.query(sql);
    },
    deletereserve : async (data, data2) => { // data를 통해 전달 받은 예약 정보 값을 가진 행 삭제
        console.log('deleteSql.deletereserve : ', data);
        const sql = `delete from seat_reservation where flight_number = ${data.Flight_number} 
        and leg_number = ${data.Leg_number} and date = '${data2.Date}' and seat_number = ${data2.Seat_number}`; // 쿼리문 작성
        
        await promisePool.query(sql);
    },
}

// insert query
export const insertSql = {
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setAirport : async (data) => { // data를 통해 전달 받은 공항 값을 삽입
      const sql = `insert into airport values (
        ${data.Airport_code}, "${data.Name}", "${data.City}" )`;
  
        await promisePool.query(sql);
    },
  
    setAirplane : async (data) => { // data를 통해 전달 받은 항공기 값을 삽입
      const sql = `insert into airplane values (
        ${data.Airplane_id}, "${data.Airplane_type}" )`;
  
        await promisePool.query(sql);
    },

    setLeg_instance : async (data) => { // data를 통해 전달 받은 항공편 값을 삽입
        const sql = `insert into leg_instance values (
          ${data.Flight_number}, ${data.Leg_number}, "${data.Date}", ${data.Airplane_id} )`;
    
          await promisePool.query(sql);
      },
      
    setUser : async (data) => { // data를 통해 전달 받은 사용자 값을 삽입 (회원가입)
        const sql = `insert into user values (
          "${data.Id}", "${data.Password}", "${data.Phone}", "${data.Name}" )`;
    
          await promisePool.query(sql);
      },

      setreserve : async (data1, data2, data3) => { // data를 통해 전달 받은 예약 값을 삽입
        const sql = `insert into seat_reservation values (
          ${data1.Flight_number}, ${data1.Leg_number}, "${data3.Date}", ${data1.Seat_number}, "${data2}" )`;
    
          await promisePool.query(sql);
      },
  }
  
  // update query
  export const updateSql = {
    updateAirport : async (data) => { // where 조건을 만족하는 행에 대해서 공항 수정
      const sql = `update airport set Name = "${data.Name}", City = "${data.City}" 
                where airport_code = ${data.Airport_code}`;

      await promisePool.query(sql);
      
    },
  
    updateAirplane : async (data) => { // where 조건을 만족하는 행에 대해서 항공기 수정
      const sql = `update airplane set airplane_type = "${data.Airplane_type}" 
                where airplane_id = ${data.Airplane_id}`;

      await promisePool.query(sql);
  
    },

    updateLeg_instance : async (data) => { // where 조건을 만족하는 행에 대해서 항공평 수정
        const sql = `update leg_instance set airplane_id = ${data.Airplane_id} 
                    where flight_number = ${data.Flight_number} and leg_number = ${data.Leg_number} and date = "${data.Date}"`;

        await promisePool.query(sql);
    
      },
  }