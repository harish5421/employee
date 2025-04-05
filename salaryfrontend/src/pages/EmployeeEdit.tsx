import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
interface FormData {
  employeeName: string;
  employeeId: string;
  department: string;
  sex: string;
  maritalStatus: string;
  salary: number;
  address: string;
}

interface EmployeeFormWithDataProps {
  initialData: FormData;
}

export const EmployeeEdit = () => {
  const [data,setData] = useState({})
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data
  });
  const { employeeId } = useParams(); 
  console.log(data);
  
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployeeById = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/getEmployee/${id}`);

        reset(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error.response?.data || error.message);
      }
    };

    if (employeeId) {
      fetchEmployeeById(employeeId);
    }
  }, [employeeId]); 
  // useEffect(() => {
  //   // Pre-fill the form with provided data
  //   reset(initialData);
  // }, [initialData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/edit/${employeeId}`, {
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
  
      console.log('Employee updated:', response.data);
    } catch (error) {
      console.error('Error updating employee:', error.response?.data || error.message);
    }
    navigate("/table");
  };

  const handleCancel = () => {
    reset(initialData); // Reset to original initialData
    navigate("/view-data");
  };



  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Update Employee Details</h1>
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
            disabled // Usually you don't allow changing ID on update
          />
          {errors.employeeId && <p style={{ color: 'red' }}>{errors.employeeId.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Department/Team</label>
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
            <option value="Divorced">Divorced</option>
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
          <button type="submit" style={{ padding: '10px 20px' }}>Update</button>
          <button type="button" onClick={handleCancel} style={{ padding: '10px 20px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
