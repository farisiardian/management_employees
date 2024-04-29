import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import EditEmployeeModal from "./EmployeesModal"; // Import the EditEmployeeModal component

function EmployeesTable() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null); // State to track the employee being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8000/api/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (employeeId) => {
    // Show a simple confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      // If confirmed, proceed with the deletion
      fetch(`http://localhost:8000/api/employees/${employeeId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  return (
    <>
      <div className="m-5">
        <Link
          to="/EmployeeForm"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Employees
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.name}
                </th>
                <td className="px-6 py-4">{employee.address}</td>
                <td className="px-6 py-4">{employee.position}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditClick(employee)} // Call handleEditClick function when "Edit" is clicked
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee.id)} // Show confirmation before deletion
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render the modal */}
      {isModalOpen && (
        <EditEmployeeModal
          employee={editingEmployee}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedEmployee) => {
            // Update the employee in the employees array
            setEmployees((prevEmployees) =>
              prevEmployees.map((emp) =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
              )
            );
          }}
        />
      )}
    </>
  );
}

export default EmployeesTable;
