DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

-- CREATE TABLES

-- EMPLOYEE DEPARTMENTS
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- EMPLOYEE ROLES
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) -- FOREIGN KEY TIES TO DEPARTMENT TABLE
    REFERENCES department(id)
);
-- EMPLOYEES
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id), -- MANAGER ID TIES TO EMPLOYEE TABLE ID FIELD
    FOREIGN KEY (role_id) -- FOREIGN KEY TIES TO ROLE TABLE
    REFERENCES role(id) -- 
    
);
