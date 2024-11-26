import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../style.css";

const Admin = () => {
  const [state, setState] = useState({
    data: [], // List of items
    name: "", // Name input
    amount: "", // Amount input
    errorMessage: "", // For storing error messages
  });

  // Fetch data manually
  const fetchData = async () => {
    try {
      const response = await axios.get("https://67413207d0b59228b7f27d1c.mockapi.io/data");
      setState((prevState) => ({
        ...prevState,
        data: response.data,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!state.name || !state.amount) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Both Name and Amount are required!",
      }));
      return;
    }

    try {
      const response = await axios.post("https://67413207d0b59228b7f27d1c.mockapi.io/data", {
        name: state.name,
        amount: state.amount,
        status: "Active", // Default status on creation
      });
      setState((prevState) => ({
        ...prevState,
        data: [...prevState.data, response.data],
        name: "",
        amount: "",
        errorMessage: "",
      }));
      window.$("#addItemModal").modal("hide");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = async (id) => {
    const updatedAmount = prompt("Enter new amount:");
    if (updatedAmount) {
      try {
        await axios.put(`https://67413207d0b59228b7f27d1c.mockapi.io/data/${id}`, {
          amount: updatedAmount,
        });
        setState((prevState) => ({
          ...prevState,
          data: prevState.data.map((item) =>
            item.id === id ? { ...item, amount: updatedAmount } : item
          ),
        }));
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://67413207d0b59228b7f27d1c.mockapi.io/data/${id}`);
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await axios.put(`https://67413207d0b59228b7f27d1c.mockapi.io/data/${id}`, {
        status: updatedStatus,
      });
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.map((item) =>
          item.id === id ? { ...item, status: updatedStatus } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <div className="text-center">
        <button
          className="btn btn-primary mb-3"
          data-toggle="modal"
          data-target="#addItemModal"
        >
          Add New Entry
        </button>
      </div>

      {/* Modal for adding item */}
      <div
        className="modal fade"
        id="addItemModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addItemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addItemModalLabel">
                Add New Item
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {state.errorMessage && (
                <div className="alert alert-danger">
                  {state.errorMessage}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={state.name}
                  onChange={(e) =>
                    setState((prevState) => ({ ...prevState, name: e.target.value }))
                  }
                  required
                />
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Amount"
                  value={state.amount}
                  onChange={(e) =>
                    setState((prevState) => ({ ...prevState, amount: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      item.status === "Active" ? "btn-success" : "btn-secondary"
                    }`}
                    onClick={() => toggleStatus(item.id, item.status)}
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="btn btn-warning btn-sm mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
