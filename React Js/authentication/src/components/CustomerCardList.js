import { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";
import { useNavigate } from "react-router-dom";
import { rest } from "../util/axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

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
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data["data"]);
        const customerArray = response.data["data"];
        customerArray.map((customer) => fetchedResult.push(customer));
      })
      .catch((error) => {
        console.log(error);
      });
    return fetchedResult;
  },

  deleteData: async (companyId, version) => {
    await rest.post(
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
  },
};

const CustomerCardList = () => {
  const [customerData, setCustomerData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getCustomers = async () => {
      const customers = await api.fetchCustomerData();
      setCustomerData(customers);
    };
    getCustomers();

    return () => {};
  }, []);

  const handleDelete = async (companyId, version) => {
    await api.deleteData(companyId, version);
    setCustomerData((prev) =>
      prev.filter((customer) => customer.id !== companyId)
    );
  };

  if (!customerData) return <LinearProgress />;

  return (
    <div>
      <div className="sticky">
        <h1>Customers</h1>
        <Box
          sx={{ display: "inline", color: "lightgreen", "&:hover": { color: "green" } }}
          onClick={() => navigate("add")}
        >
          <AddCircleIcon />
        </Box>
      </div>
      <div className="cards-view">
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
    </div>
  );
};

export default CustomerCardList;
