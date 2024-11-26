import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap
import "../style.css"; // Assuming you have custom styles

const DataOperator = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Handle opening the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle adding data
  const handleAdd = () => {
    if (!name || !amount) {
      alert("Both Name and Amount are required.");
      return;
    }

    axios
      .post("https://67413207d0b59228b7f27d1c.mockapi.io/data", { name, amount })
      .then(() => {
        alert("Data added successfully!");
        closeModal(); // Close the modal after successful add
        setName(""); // Reset form fields
        setAmount(""); // Reset form fields
      })
      .catch(() => {
        alert("Failed to add data!");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Data Operator Panel</h2>

      {/* Button to trigger modal */}
      <div className="text-center">
        <button onClick={openModal} className="btn btn-primary">
          Add Data
        </button>
      </div>

      {/* Modal for adding data */}
      {showModal && (
        <div className="modal show" style={{ display: "block", marginTop:'200px' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Data</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form to add Name and Amount */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAdd}>
                  Add Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataOperator;
