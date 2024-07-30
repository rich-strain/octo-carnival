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

// Function to display the initial main menu
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
      // depending on the user's choice, call the appropriate function to handle the needed action
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

// Display All Departments In The Terminal
const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table('\n', res.rows);
    mainMenu();
  });
};

// Display All Roles In The Terminal
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

// Display All Employees In The Terminal
const viewAllEmployees = () => {
  db.query(
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;`,
    (err, res) => {
      if (err) throw err;
      console.table('\n', res.rows);
      mainMenu();
    }
  );
};

const addEmployee = () => {};

// Create New Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answer) => {
      // Insert the new department into the department table, using $1 as a placeholder to prevent SQL injection
      db.query('INSERT INTO department (name) VALUES ($1)', [answer.department], (err, res) => {
        if (err) throw err;
        console.log(`${answer.department} added to the department table. \n`);
        mainMenu();
      });
    });
};

// Add employee role, role consist of title, salary and department
const addRole = () => {
  // Get all departments to display as choices
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // create an array of department objects to use as choices
    const departments = res.rows.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role:',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for the role:',
          choices: departments,
        },
      ])
      .then((answer) => {
        // Insert the new department into the department table, using $1, $2, $3 as a placeholders to prevent SQL injection
        db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.title, answer.salary, answer.department_id], (err, res) => {
          if (err) throw err;
          console.log(`${answer.title} added to the role table. \n`);
          mainMenu();
        });
      });
  });
};

const updateEmployeeRole = () => {};
