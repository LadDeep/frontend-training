import { useState, useEffect } from "react";
import AddCustomerForm from "./AddCustomerForm";
import CustomerCard from "./CustomerCard";
import axios from "axios";

const CustomerCardList = () => {
  const [customerData, setCustomerData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchCustomerData = () => {
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
            baseURL: "https://sos.axelor.com/axelor-office",
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
          for (let i = 0; i < customerArray.length; i++) {
            const customer = customerArray[i];
            const customerData = {
              id: customer.id,
              picture: customer.picture,
              name: customer.fullName,
              code: customer.registrationCode,
              address: customer.mainAddress,
              phone: customer.fixedPhone,
              partnerCategory: customer.partnerCategory,
              companyStr: customer.companyStr,
              fiscalPos: {
                isCustomer: customer.isCarrier,
                isCarrier: customer.isCustomer,
                isEmployee: customer.isEmployee,
                isFactor: customer.isFactor,
                isProspect: customer.isProspect,
                isSubcontractor: customer.isSubcontractor,
                isSupplier: customer.isSupplier,
              },
            };
            fetchedResult.push(customerData);
          }
          setCustomerData(fetchedResult);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCustomerData();
    // console.log(getBaseURL());
    // const customers = api.fetchCustomerData();
    // setCustomerData(customers);
  }, []);

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleDelete = (companyId) => {
    setCustomerData((prev) =>
      prev.filter((customer) => customer.id !== companyId)
    );
  };

  return (
    <div>
      <h1>Customers List</h1>
      <button onClick={handleAdd}>Add</button>
      {isAdding && (
        <AddCustomerForm
          setCurrentState={setIsAdding}
          setCustomerData={setCustomerData}
          index={customerData.length}
        />
      )}
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
