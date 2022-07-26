import { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { api } from "../util/api";


const CustomerCardList = () => {
  const [customerData, setCustomerData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getCustomers = async () => {
      const customers = await api.fetchCustomerList();
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
    <>
      <div className="sticky">
        <h1>Customers</h1>
        <Box
          sx={{
            display: "flex",
            color: "lightgreen",
          }}
          onClick={() => navigate("add")}
        >
          <AddCircleIcon
            sx={{ "&:hover": { color: "green" } }}
            titleAccess="Add"
          />
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
    </>
  );
};

export default CustomerCardList;
