import CustomerForm from "./CustomerForm";

const AddCustomerForm = () => {
  const data = { isCustomer: true };
  return <CustomerForm data={data} isNew={true} />;
};

export default AddCustomerForm;
