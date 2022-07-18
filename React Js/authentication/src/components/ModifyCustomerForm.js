import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { rest } from "../util/axios";
import CustomerForm from "./CustomerForm";

const api = {
  fetchCustomer: async (selectedCustomerId) => {
    let customer;
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
            "name",
            "parentId",
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
            "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
          },
        }
      )
      .then((response) => {
        const customerArray = response.data["data"];
        customer = customerArray.filter((customer) => customer.id === selectedCustomerId);
      })
      .catch((error) => {
        console.log(error);
      });
    return customer[0];
  },
};

const ModifyCustomerForm = () => {
  const params = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const fetchCustomer = async () => {
      const customer = await api.fetchCustomer(parseInt(params.id, 10));
      setCustomer(customer);
    };

    fetchCustomer();

    return () => {};
  }, []);

  return customer && <CustomerForm data={customer} isNew={false} />;
};

export default ModifyCustomerForm;
