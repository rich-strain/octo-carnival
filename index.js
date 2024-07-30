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
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
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
