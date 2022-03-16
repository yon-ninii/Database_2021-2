# Database

2021년도 2학기 데이터베이스 설계 수업 관련 과제 및 공부하 내용을 정리한 레포지토리 입니다.

## 3주차 실습 실행 방법

1. 레포지토리 복사(wsl 환경에서 명령어 입력)
   - (SSH 설정한 경우) git clone git@github.com:yon-ninii/Database.git
   - (token을 사용하는 경우) git clone https://github.com/yon-ninii/Database.git
2. week_3 폴더로 이동
   > cd week_3
3. 콘솔창(powershell)에서 npm package 설치
   > npm install
4. database/sql.js에서 본인의 데이터베이스 정보 입력(주석부분)
<pre>
<code>
const pool = mysql.createPool{
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root', //본인의 mysql user id
        database: 'tutorial', // 본인이 만든 데이터베이스 이름
        password: 'password', // 본인의 mysql password
        waitForConnections: true,
        connectionLimit: 10,
        queueLimitL 0
    }
};
</code>
</pre>

<br>

## <span style="color:cyan">테이블 작성법</span>

| 이름   | 과             | 전공         | 학번     |
| ------ | -------------- | ------------ | -------- |
| 김영희 | 정보통신공학과 | 정보통신     | 12201111 |
| 홍길동 | 컴퓨터공학과   | 데이터베이스 | 12191111 |
| 이순신 | 인공지능학과   | 인공지능     | 12181111 |

## 텍스트 강조

- **데이터베이스** 실습은 재미 ~~없어요~~있어요.
  <br><br>

## **3주차 테이블**

### create user table

```sql
create table user(
    StudentNumber int not null,
    Name char(20) not null,
    StudentYear int not null,
    StudentMajor char(30) not null,
    StudentEmail char(30) not null,
    PRIMARY KEY(StudnetNumber)
);
```

### Insert data result

| StudentNumber | Name   | StudentYear | StudentMajor   | StudentEmail      |
| ------------- | ------ | ----------- | -------------- | ----------------- |
| 12171786      | 박용민 | 3           | 정보통신공학과 | 701pooh@naver.com |
| 12123456      | 김철수 | 4           | 정보통신공학과 | 철수@gmail.com    |
| 12211234      | 홍길동 | 1           | 정보통신공학과 | 길동@gmail.com    |

<br>

## **8주차 테이블**

### create department table

```sql
create table department(
    Dname varchar(15) not null UNIQUE,
    Dnumber int not null,
    Mgr_ssn char(9) not null,
    Mgr_start_date date,
    PRIMARY KEY (Dnumber)
    FOREIGN KEY (Mgr_ssn) REFERENCES employee (Ssn),
    UNIQUE (Dname)
);
```

### Insert data result

| Dname          | Dnumber | Mgr_ssn  | Mgr_start_date |
| -------------- | ------- | -------- | -------------- |
| 정보통신공학과 | 1       | 12121212 | 2017-03-12     |
| 동양화과       | 2       | 13131313 | 2020-12-03     |
| 국문학과       | 3       | 15151515 | 2020-12-25     |

<br>

### create employee table

```sql
create table employee(
    Fname varchar(10) not null,
    Minit char(1),
    Lname varchar(20) not null,
    Ssn char(9) not null,
    Bdate date,
    Address varchar(30),
    Sex char(1),
    Salary char(9),
    Dno int not null,
    PRIMARY KEY(Ssn)
);
```

### Insert data result

| Fname | Minit | Lname | Ssn      | Bdate      | Address  | Sex | Salary | Super_ssn | Dno |
| ----- | ----- | ----- | -------- | ---------- | -------- | --- | ------ | --------- | --- |
| 김    | B     | 철수  | 12121212 | 1997-05-05 | 서울     | 남  | 8000   | null      | 1   |
| 박    | A     | 용민  | 12171786 | 1998-07-01 | 인천     | 남  | 7000   | 12121212  | 1   |
| 이    | C     | 가은  | 13131313 | 2001-01-11 | 충청북도 | 여  | 4000   | 14141414  | 2   |

<br>

## **10주차 테이블**

### create department table

```sql
create table department(
    Dname varchar(15) not null UNIQUE,
    Dnumber int not null,
    PRIMARY KEY (Dnumber)
);
```

### Insert data result

| Dname          | Dnumber |
| -------------- | ------- |
| 정보통신공학과 | 0       |
| 컴퓨터공학과   | 1       |
| 전기공학과     | 2       |
| 전자공학과     | 3       |

<br>

### create user table

```sql
create table user(
    Id varchar(20) not null,
    Password varchar(20) not null,
    Role varchar(5) not null,
    PRIMARY KEY (Id)
);
```

### Insert data result

| Id    | Password  | Role  |
| ----- | --------- | ----- |
| admin | admin1234 | admin |
| user  | user1234  | users |

<br>

### create student table

```sql
create table student(
    name varchar(10) not null,
    sex char(1),
    Ssn char(9) not null,
    year int not null,
    PRIMARY KEY (Ssn)
);
```

### Insert data result

| name   | sex | Ssn      | year |
| ------ | --- | -------- | ---- |
| 이가은 | 여  | 12121212 | 2    |
| 박진성 | 남  | 14141414 | 3    |
| 박용민 | 남  | 12171786 | 3    |
| 이경아 | 여  | 16161616 | 4    |
| 남지연 | 여  | 18181818 | 1    |

<br>
