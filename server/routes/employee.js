import express from 'express'; // import express

import { getEmployees, createEmployee, getEmployeeByID, updateEmployee, deleteEmployee} from '../controllers/employee.js'; // import the getEmployees and createEmployee functions from the employee controller

const router = express.Router(); // create a router

router.get('/', getEmployees);

router.get('/:id', getEmployeeByID);

router.post('/', createEmployee);

router.patch('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

export default router; // export the router