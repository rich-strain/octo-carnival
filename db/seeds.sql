\c company_db;
-- Seed departments table
INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

-- Seed roles table
INSERT INTO role (title,department_id,salary)
VALUES
('Sales Lead',1,100000),
('Salesperson',1,80000),
('Lead Engineer',2,150000),
('Software Engineer',2,120000),
('Account Manager',3,160000),
('Accountant',3,125000),
('Legal Team Lead',4,250000),
('Lawyer',4,190000);

-- Seed employees table
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES  
('Homer','Simpson',1,NULL),
('Mike','Chan',2,1),
('Sideshow','Bob',3,NULL),
('Kevin','Tupik',4,3),
('Ned','Flanders',5,NULL),
('Malia','Brown',6,5),
('Krusty','Klown',7,NULL),
('Tom','Allen',8,7);

\dt;