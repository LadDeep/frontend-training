import { useState } from "react";

const Form = (props) => {
  const [data, setData] = useState(props.data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dataHandler(data);
  };

  const cancelRequest = () => {
    props.setCurrentState(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>{props.mode} Customer</legend>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Registration Code:
          <input
            type="text"
            name="code"
            value={data.code}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Sociétés:
          <input
            type="text"
            name="companyStr"
            value={data.companyStr}
            onChange={handleChange}
          />
        </label>
        <input className="btn" type="submit" value={props.mode} />
        <input
          className="btn"
          type="button"
          value="Cancel"
          onClick={cancelRequest}
        />
      </fieldset>
    </form>
  );
};

export default Form;
