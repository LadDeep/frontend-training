import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { rest } from "../util/axios";

const CustomerForm = (props) => {
  const [currentCustomer, setCurrentCustomer] = useState(props.data);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    rest.post(
      "/ws/rest/com.axelor.apps.base.db.Partner",
      {
        data: currentCustomer,
      },
      {
        headers: {
          "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
        },
      }
    );

    navigate("/");
  };

  const cancelRequest = () => {
    navigate("/");
  };

  useEffect(() => {
    setCurrentCustomer(props.data);
  }, [props.data]);

  console.log(props.data, currentCustomer);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>{props.isNew ? "Add" : "Edit"} Customer</legend>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={currentCustomer.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Registration Code:
            <input
              type="text"
              name="registrationCode"
              value={currentCustomer.registrationCode}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="fixedPhone"
              value={currentCustomer.fixedPhone}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="emailAddress.address"
              value={currentCustomer.emailAddress ? currentCustomer.emailAddress.address : ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Sociétés:
            <input
              type="text"
              name="companyStr"
              value={currentCustomer.companyStr}
              onChange={handleChange}
            />
          </label>
          <input
            className="btn"
            type="submit"
            value={props.isNew ? "Add" : "Save Changes"}
          />
          <input
            className="btn"
            type="button"
            value="Cancel"
            onClick={cancelRequest}
          />
        </fieldset>
      </form>
    </>
  );
};

export default CustomerForm;
