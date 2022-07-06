import Form from "./Form";

const ModifyCustomerForm = (props) => {
  const updateCustomerInfo = (data) => {
    props.setCurrentState(false);
    props.setCustomerData((prev) =>
      prev.map((customer, index) => {
        if (index === props.index) {
          return data;
        }
        return customer;
      })
    );
  };

  return (
    <Form
      dataHandler={updateCustomerInfo}
      mode="Edit"
      data={props.data}
      setCurrentState={props.setCurrentState}
    />
  );
};

export default ModifyCustomerForm;
