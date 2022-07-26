import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getBaseURL } from "../util/axios";
import { api } from "../util/api";
import "../styles/CustomerForm.css";

const CustomerForm = (props) => {
  const [currentCustomer, setCurrentCustomer] = useState(props.data);
  const [partnerCategories, setPartnerCategories] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.type !== "checkbox") {
      const { name, value } = event.target;
      setCurrentCustomer((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const name = event.target.name;
      setCurrentCustomer((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await api.submitData(currentCustomer);
    navigate("/");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const id = await api.uploadImage(file);

    if (id) {
      setCurrentCustomer((prev) => ({
        ...prev,
        picture: { id: id },
      }));
    }
  };

  const handlePartnerCategoryChange = (event) => {
    let partner = partnerCategories.filter(
      (partner) => partner.name === event.target.value
    );
    setCurrentCustomer((prev) => ({
      ...prev,
      partnerCategory: partner[0],
    }));
  };

  const cancelRequest = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchPartnerCategories = async () => {
      const categories = await api.getPartnerCategories();
      setPartnerCategories(categories);
    };
    fetchPartnerCategories();
    return () => {};
  }, []);

  return (
    <div className="card customer-form">
      <h1>{props.isNew ? "Add" : "Edit"} Profile</h1>
      <hr />
      <div className="customer-form__wrapper">
        <div className="customer-form__profile-img-wrapper">
          <div className="customer-form__profile-img-container">
            <img
              src={
                currentCustomer.picture && currentCustomer.picture.id
                  ? `${getBaseURL()}/ws/rest/com.axelor.meta.db.MetaFile/${
                      currentCustomer.picture.id
                    }/content/download?image=true&v=0&parentId${
                      currentCustomer.picture.id
                    }&parentModel=com.axelor.meta.db.MetaFile`
                  : `${getBaseURL()}/img/company-default.jpg`
              }
              alt=""
              height="150px"
              width="150px"
            ></img>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="customer-form__form-contianer">
          <legend className="customer-form__form-heading">Customer Info</legend>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="form-control">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentCustomer.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="registrationCode">Registration Code:</label>
                <input
                  type="text"
                  id="registrationCode"
                  name="registrationCode"
                  value={currentCustomer.registrationCode || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor="fixedPhone">Phone:</label>
                <input
                  type="tel"
                  id="fixedPhone"
                  name="fixedPhone"
                  value={currentCustomer.fixedPhone || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div style={{ padding: "1em 0 0" }}>Type:</div>
                <div className="label-types">
                  <label>
                    <input
                      type="checkbox"
                      name="isSupplier"
                      checked={currentCustomer.isSupplier || false}
                      onChange={handleChange}
                    />
                    Supplier
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isCustomer"
                      checked={currentCustomer.isCustomer || false}
                      onChange={handleChange}
                    />
                    Customer
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isProspect"
                      checked={currentCustomer.isProspect || false}
                      onChange={handleChange}
                    />
                    Prospect
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isEmployee"
                      checked={currentCustomer.isEmployee || false}
                      onChange={handleChange}
                    />
                    Employee
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isFactor"
                      checked={currentCustomer.isFactor || false}
                      onChange={handleChange}
                    />
                    Factor
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isCarrier"
                      checked={currentCustomer.isCarrier || false}
                      onChange={handleChange}
                    />
                    Carrier
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isSubcontractor"
                      checked={currentCustomer.isSubcontractor || false}
                      onChange={handleChange}
                    />
                    Subcontractor
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label>
                  Partner Category: 
                  <select onChange={handlePartnerCategoryChange}>
                    {partnerCategories &&
                      partnerCategories.map((category) => (
                        <option
                          key={category.id}
                          selected={
                            currentCustomer.partnerCategory &&
                            currentCustomer.partnerCategory.id === category.id
                          }
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
