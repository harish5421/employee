import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface FormData {
  employeeName: string;
  employeeId: string;
  department: string;
  sex: string;
  maritalStatus: string;
  salary: number;
  address: string;
}

export const  EmployeeForm = ()=> {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log("Submitted Data:", data);
    // TODO: Submit data to the database

    try {
      const response = await axios.post('http://localhost:5000/api/employees/addEmployee', {
        employeeName: data.employeeName,
        employeeId: data.employeeId,
        department: data.employeeId,
        sex: data.sex,
        maritalStatus: data.maritalStatus,
        salary: data.salary,
        address:data.address
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Employee added:', response.data);
    } catch (error) {
      console.error('Error adding employee:', error.response?.data || error.message);
    }
    navigate("/table");
  };

  const handleView = () => {
    navigate("/table");
  };

  const handleCancel = () => {
    reset();
    navigate("/view-data");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Employee Details Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label>Employee Name</label>
          <input
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            {...register("employeeName", { required: "Employee name is required" })}
          />
          {errors.employeeName && <p style={{ color: 'red' }}>{errors.employeeName.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Employee ID</label>
          <input
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            {...register("employeeId", { required: "Employee ID is required" })}
          />
          {errors.employeeId && <p style={{ color: 'red' }}>{errors.employeeId.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{marginBottom:'10px'}}>Department/Team</label>
          <select style={{ width: '100%', padding: '8px' }} {...register("department", { required: "Department is required" })}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.department && <p style={{ color: 'red' }}>{errors.department.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Sex</label>
          <div>
            <label style={{ marginRight: '10px' }}>
              <input type="radio" value="Male" {...register("sex", { required: "Sex is required" })} /> Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("sex", { required: "Sex is required" })} /> Female
            </label>
          </div>
          {errors.sex && <p style={{ color: 'red' }}>{errors.sex.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Marital Status</label>
          <select style={{ width: '100%', padding: '8px' }} {...register("maritalStatus", { required: "Marital status is required" })}>
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.maritalStatus && <p style={{ color: 'red' }}>{errors.maritalStatus.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Salary</label>
          <input
            type="number"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            {...register("salary", { required: "Salary is required", min: 0 })}
          />
          {errors.salary && <p style={{ color: 'red' }}>{errors.salary.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Address</label>
          <textarea
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            {...register("address", { required: "Address is required" })}
          ></textarea>
          {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
          <button type="button" onClick={handleView} style={{ padding: '10px 20px' }}>View</button>
          <button type="button" onClick={handleCancel} style={{ padding: '10px 20px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
