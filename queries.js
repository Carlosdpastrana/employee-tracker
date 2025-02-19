const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

const viewDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  console.table(res.rows);
};

const viewRoles = async () => {
  const res = await pool.query(`
    SELECT role.id, title, salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
};

const viewEmployees = async () => {
  const res = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, m.first_name AS manager
    FROM employee e
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  console.table(res.rows);
};

const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log('Department added!');
};

const addRole = async (title, salary, departmentId) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log('Role added!');
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  console.log('Employee added!');
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
  console.log('Employee role updated!');
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};