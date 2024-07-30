\c company_db;
-- Seed departments table
-- INSERT INTO department (name)
-- VALUES
-- ('Sales'),
-- ('Engineering'),
-- ('Finance'),
-- ('Legal');

-- Seed roles table
-- INSERT INTO role (title,department_id,salary)
-- VALUES
-- ('Sales Lead',1,100000),
-- ('Salesperson',1,80000),
-- ('Lead Engineer',2,150000),
-- ('Software Engineer',2,120000),
-- ('Account Manager',3,160000),
-- ('Accountant',3,125000),
-- ('Legal Team Lead',4,250000),
-- ('Lawyer',4,190000);

-- Seed employees table
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES  
('Bart','Simpson',1,NULL),
('Lisa','Simpson',2,1),
('Homer','Simpson',3,NULL),
('Marge','Simpson',4,3),
('Ned','Flanders',5,3),
('Sideshow','Bob',6,3),
('Krusty','Klown',7,4),
('Moe','Szyslak',8,7);

\dt;