import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { rest } from "../util/axios";

const api = {
  submitData: async (currentCustomer) => {
    await rest.post(
      "/ws/rest/com.axelor.apps.base.db.Partner",
      {
        data: currentCustomer,
      },
      {
        headers: {
          "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
        },
        withCredentials: true,
      }
    );
  },

  uploadImage: async (file) => {
    let id;
    await rest
      .post(
        "/ws/rest/com.axelor.meta.db.MetaFile/upload",
        {
          file: file,
          field: `${undefined}`,
          request: `${JSON.stringify({
            data: {
              data: {
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                $upload: { file: {} },
              },
            },
          })}`,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
            "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
          },
        }
      )
      .then((response) => {
        if (response.data.status === 0) {
          id = response.data.data[0].id;
        }
      });
    return id;
  },
};

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

  const cancelRequest = () => {
    navigate("/");
  };

  useEffect(() => {
    setCurrentCustomer(props.data);
  }, [props.data]);

  return (
    <div className="card" style={{ margin: "1em auto", width: "70%" }}>
      <h1>{props.isNew ? "Add" : "Edit"} Profile</h1>
      <hr />
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 3fr" }}>
        <div style={{ padding: "0.5em" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ border: "1px solid gray", margin: "0.5em 0" }}
              src={
                currentCustomer.picture && currentCustomer.picture.id
                  ? `${rest.defaults.baseURL}/ws/rest/com.axelor.meta.db.MetaFile/${currentCustomer.picture.id}/content/download?image=true&v=0&parentId${currentCustomer.picture.id}&parentModel=com.axelor.meta.db.MetaFile`
                  : `${rest.defaults.baseURL}/img/company-default.jpg`
              }
              alt=""
              height="150px"
              width="150px"
            ></img>
            <input
              style={{ margin: "0.5em 0" }}
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div style={{ margin: "1em 0", verticalAlign: "top" }}>
          <legend style={{ fontWeight: "bold", fontSize: "24px" }}>
            Customer Info
          </legend>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentCustomer.name || ""}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Registration Code:
                <input
                  type="text"
                  name="registrationCode"
                  value={currentCustomer.registrationCode || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="fixedPhone"
                  value={currentCustomer.fixedPhone || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="emailAddress.address"
                  value={currentCustomer["emailAddress.address"] || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sociétés:
                <input
                  type="text"
                  name="companyStr"
                  value={currentCustomer.companyStr || ""}
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
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
