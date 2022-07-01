import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUCCESS = 200;

const Login = (props) => {
  const [{ username, password, baseURL }, setState] = useState({
    username: "",
    password: "",
    baseURL: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/login.jsp",
        {
          username: username,
          password: password,
        },
        {
          baseURL: baseURL,
        }
      )
      .then((response) => {
        if (response.status === SUCCESS) {
          axios
            .get("/ws/app/info", {
              baseURL: baseURL,
              withCredentials: true,
            })
            .then((response) => {
              const csrf = response.headers["x-csrf-token"];
              const customerData=fetchCustomerData(csrf);
              const userData = {
                id: response.data["user.id"],
                name: response.data["user.name"],
                lang: response.data["user.lang"],
                profileImg: baseURL + "/" + response.data["user.image"],
                type: response.data["user.login"],
              };
              props.logIn(userData, customerData);
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCustomerData = (csrf) => {
    const fetchedResult = [];
    axios
      .post(
        "/ws/rest/com%2Eaxelor%2Eapps%2Ebase%2Edb%2EPartner/search",
        {
          fields: [
            "fiscalPosition.code",
            "isProspect",
            "isEmployee",
            "isSupplier",
            "isSubcontractor",
            "fullName",
            "fixedPhone",
            "partnerTypeSelect",
            "companyStr",
            "mainAddress",
            "picture",
            "titleSelect",
            "isCustomer",
            "partnerCategory",
            "isCarrier",
            "emailAddress.address",
            "registrationCode",
            "isFactor",
          ],
          sortBy: null,
          data: {
            _domain:
              "self.isContact = false AND (self.isCustomer = true OR self.isProspect = true)",
            _domainContext: {
              _isCustomer: "true",
              _domain:
                "self.isContact = false AND (self.isCustomer = true OR self.isProspect = true)",
              "json-enhance": true,
              _id: null,
            },
          },
          limit: 39,
          offset: 0,
          translate: true,
        },
        {
          baseURL: baseURL,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-Token": csrf,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const customerArray = response.data["data"];
        for (let i = 0; i < customerArray.length; i++) {
          const customer = customerArray[i];
          const customerData = {
            'id': customer.id,
            'picture': customer.picture,
            'name': customer.fullName,
            'code': customer.registrationCode,
            'address': customer.mainAddress,
            'phone': customer.fixedPhone,
            'partnerCategory': customer.partnerCategory,
            'companyStr': customer.companyStr,
            'fiscalPos': {
              'isCustomer': customer.isCarrier,
              'isCarrier': customer.isCustomer,
              'isEmployee': customer.isEmployee,
              'isFactor': customer.isFactor,
              'isProspect': customer.isProspect,
              'isSubcontractor': customer.isSubcontractor,
              'isSupplier': customer.isSupplier
            }
          }
          fetchedResult.push(customerData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      return fetchedResult;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <label>
          Server URL:
          <input
            type="url"
            name="baseURL"
            value={baseURL}
            onChange={handleChange}
          />
        </label>
        <input className="btn" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
