import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees/getAllEmployees"
      );
      setData(response.data);
    } catch (error) {
      console.error(
        "Error fetching employees:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "employeeName",
        header: "Name",
      },
      {
        accessorKey: "employeeId",
        header: "Employee ID",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "sex",
        header: "Sex",
      },
      {
        accessorKey: "maritalStatus",
        header: "Marital Status",
      },
      {
        accessorKey: "salary",
        header: "Salary",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
              onClick={() => handleEdit(row.original.employeeId)}
            >
              Edit
            </button>
            <button
              style={{
                padding: "4px 8px",
                border: "1px solid red",
                borderRadius: "4px",
                backgroundColor: "#ffe5e5",
                color: "red",
              }}
              onClick={() => handleDelete(row.original.employeeId)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (employee) => {
    console.log("table",employee);
    
    navigate(`/edit/${employee}`);

  };

  const handleDelete = async (employeeId: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/employees/deleteByEmployeeId/${employeeId}`
      );
      fetchAllEmployees();
      console.log("Employee deleted:", response.data);
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        margin: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "left",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ padding: "8px", border: "1px solid #ddd" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
