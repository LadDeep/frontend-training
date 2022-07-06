import Form from "./Form";

const AddCustomerForm = (props) => {
  const newUserData = {
    id: props.index,
    picture: "",
    name: "",
    code: "",
    address: "",
    phone: "",
    partnerCategory: "",
    companyStr: "",
    fiscalPos: {
      isCustomer: true,
      isCarrier: false,
      isEmployee: false,
      isFactor: false,
      isProspect: false,
      isSubcontractor: false,
      isSupplier: false,
    },
  };
  const insertNewCustomer = (data) => {
    props.setCurrentState(false);
    props.setCustomerData((prev) => [...prev, data]);
  };

  return (
    <Form
      dataHandler={insertNewCustomer}
      mode="Create"
      data={newUserData}
      setCurrentState={props.setCurrentState}
    />
  );
};

export default AddCustomerForm;
