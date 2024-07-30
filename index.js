const { Client } = require('pg');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Create connection to PostgreSQL database
const db = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'R00t',
  database: 'company_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  mainMenu();
});

// Function to display the main menu
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Exit':
          db.end();
          break;
      }
    });
}

// View all departments
const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table('\n', res.rows);
    mainMenu();
  });
};

const viewAllRoles = () => {
  db.query(
    'SELECT role.id, role.title, department.name as department, role.salary FROM role JOIN department ON role.department_id = department.id;',
    (err, res) => {
      if (err) throw err;
      console.table('\n', res.rows);
      mainMenu();
    }
  );
};

// Needs to be fixed - Manager Name is not displaying
const viewAllEmployees = () => {
  db.query(
    'SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department, m.first_name as manager_first_name, m.last_name as manager_last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;',
    (err, res) => {
      if (err) throw err;
      console.table('\n', res.rows);
      mainMenu();
    }
  );
};

const addEmployee = () => {};

const addDepartment = () => {};

const addRole = () => {};

const updateEmployeeRole = () => {};
