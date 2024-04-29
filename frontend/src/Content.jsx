const Content = () => {
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
      <button
        onClick={() => handleDeleteClick(employee.id)} // Show confirmation before deletion
        className="font-medium text-red-600 hover:underline"
      >
        Delete
      </button>
    </>
  );
};

export default Content;
