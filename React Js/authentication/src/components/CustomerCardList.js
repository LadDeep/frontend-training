import { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";
import { useNavigate } from "react-router-dom";
import { rest } from "../util/axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from "@mui/material/Box";
const api = {
  fetchCustomerData: async () => {
    let fetchedResult = [];
    await rest
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
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
          },
        }
      )
      .then((response) => {
        const customerArray = response.data["data"];
        customerArray.map((customer) => fetchedResult.push(customer));
      })
      .catch((error) => {
        console.log(error);
      });
    return fetchedResult;
  },
};

const CustomerCardList = () => {
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCustomerData = () => {
      rest
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
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          const fetchedResult = [];
          const customerArray = response.data["data"];

          customerArray.map((customer) => fetchedResult.push(customer));
          setCustomerData(fetchedResult);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCustomerData();

    // const fetchData = async()=>{
    //   const data = await api.fetchCustomerData();
    // }
    // setCustomerData(fetchData);
  }, []);

  const handleDelete = (companyId, version) => {
    // TODO: handle request

    rest.post(
      "/ws/rest/com.axelor.apps.base.db.Partner/removeAll",
      {
        records: [
          {
            id: companyId,
            version: version,
          },
        ],
      },
      {
        headers: {
          "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
        },
      }
    );
    setCustomerData((prev) =>
      prev.filter((customer) => customer.id !== companyId)
    );
  };

  return (
    <div>
      <h1>Customers List</h1>
      <Box>
        <AddCircleIcon sx={{color: "green"}} onClick={() => navigate("add")} />
      </Box>
      {/* <button onClick={() => navigate("add")}>Add</button> */}
      {customerData &&
        customerData.map((customer, index) => (
          <CustomerCard
            key={index}
            company={customer}
            setCustomerData={setCustomerData}
            index={index}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default CustomerCardList;
