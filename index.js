const inquirer = require('inquirer');
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./queries');

const startApp = () => {
  inquirer.prompt({
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
  })
    .then(async ({ choice }) => {
      switch (choice) {
        case 'View all departments':
          await viewDepartments();
          break;
        case 'View all roles':
          await viewRoles();
          break;
        case 'View all employees':
          await viewEmployees();
          break;
        case 'Add a department':
          const { deptName } = await inquirer.prompt({ type: 'input', name: 'deptName', message: 'Department name?' });
          await addDepartment(deptName);
          break;
        case 'Add a role':
          const { roleName, roleSalary, roleDept } = await inquirer.prompt([
            { type: 'input', name: 'roleName', message: 'Role name?' },
            { type: 'input', name: 'roleSalary', message: 'Salary?' },
            { type: 'input', name: 'roleDept', message: 'Department ID?' },
          ]);
          await addRole(roleName, roleSalary, roleDept);
          break;
        case 'Add an employee':
          const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            { type: 'input', name: 'firstName', message: 'First name?' },
            { type: 'input', name: 'lastName', message: 'Last name?' },
            { type: 'input', name: 'roleId', message: 'Role ID?' },
            { type: 'input', name: 'managerId', message: 'Manager ID (or leave blank)?', default: null },
          ]);
          await addEmployee(firstName, lastName, roleId, managerId || null);
          break;
        case 'Update an employee role':
          const { employeeId, newRoleId } = await inquirer.prompt([
            { type: 'input', name: 'employeeId', message: 'Employee ID?' },
            { type: 'input', name: 'newRoleId', message: 'New Role ID?' },
          ]);
          await updateEmployeeRole(employeeId, newRoleId);
          break;
        default:
          process.exit();
      }
      startApp();
    });
};

startApp();