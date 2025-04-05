import { Routes, Route, Navigate } from "react-router-dom";
import {EmployeeForm} from "../pages/EmployeeForm";
import {EmployeeTable} from "../pages/EmployeeTable";
import { EmployeeEdit } from "../pages/EmployeeEdit";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeForm />} />
      <Route path="/table" element={<EmployeeTable />} />
      <Route path="/edit/:employeeId" element={<EmployeeEdit/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
