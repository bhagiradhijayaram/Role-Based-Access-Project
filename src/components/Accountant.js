import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

const Accountant = () => {
  const [data, setData] = useState([]);

  // Fetch data from the Mock API
  useEffect(() => {
    axios
      .get("https://67413207d0b59228b7f27d1c.mockapi.io/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle updating the "amount" field
  const handleUpdate = (id) => {
    const updatedAmount = prompt("Enter updated amount:");
    if (updatedAmount) {
      axios
        .put(`https://67413207d0b59228b7f27d1c.mockapi.io/data/${id}`, {
          amount: updatedAmount,
        })
        .then(() => {
          setData(
            data.map((item) =>
              item.id === id ? { ...item, amount: updatedAmount } : item
            )
          );
        })
        .catch((error) => console.error("Error updating amount:", error));
    }
  };

  // Handle toggling status
  const toggleStatus = (id, currentStatus) => {
    const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active";
    axios
      .put(`https://67413207d0b59228b7f27d1c.mockapi.io/data/${id}`, {
        status: updatedStatus,
      })
      .then(() => {
        setData(
          data.map((item) =>
            item.id === id ? { ...item, status: updatedStatus } : item
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Accountant Panel</h2>

      {/* Displaying List of Entries in Table-like Structure */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {/* Name Column */}
                <td>{item.name}</td>

                {/* Amount Column */}
                <td>{item.amount}</td>

                {/* Status Column */}
                <td>
                  <button
                    className={`btn btn-sm ${
                      item.status === "Active"
                        ? "btn-success"
                        : "btn-secondary"
                    }`}
                    onClick={() => toggleStatus(item.id, item.status)}
                  >
                    {item.status}
                  </button>
                </td>

                {/* Update Button Column */}
                <td>
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="btn btn-warning btn-sm"
                  >
                    Update Amount
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

export default Accountant;
