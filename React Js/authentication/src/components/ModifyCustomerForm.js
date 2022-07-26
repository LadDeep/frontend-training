import { LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import { api } from "../util/api";

const ModifyCustomerForm = () => {
  const params = useParams();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const fetchCustomer = async () => {
      const customer = await api.fetchCurrentCustomer(parseInt(params.id, 10));
      setCustomer(customer);
    };

    fetchCustomer();
    return () => {};
  }, []);

  if(!customer)
    return <LinearProgress/>

  return customer && <CustomerForm data={customer} isNew={false} />;
};

export default ModifyCustomerForm;
