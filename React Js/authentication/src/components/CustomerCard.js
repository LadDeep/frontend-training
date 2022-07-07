import { useState, useEffect } from "react";
import ModifyCustomerForm from "./ModifyCustomerForm";
import DeleteIcon from '@mui/icons-material/Delete';

const Label = (props) => {
  return (
    props.type && (
      <span className="label" style={{ backgroundColor: props.color }}>
        {props.name}
      </span>
    )
  );
};

const CustomerCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState(props.company);

  const handleEditRequest = () => {
    setIsEditing(!isEditing);
  };

  const cancelEditRequest = () => {
      setIsEditing(false);
  }

  const deleteCustomer = ()=>{
    console.log("Delete Current prop", customer.id);
    props.handleDelete(customer.id);
  }

  useEffect(() => {
    setIsEditing(false);
    setCustomer(props.company);
  }, [props.company])

  return (
    <>
      <div
        className="card"
        onClick={handleEditRequest}
        onBlur={cancelEditRequest}
        style={isEditing ? { border: "2px solid red" } : { border: "none" }}
      >
        <DeleteIcon sx={{float: 'right'}} onClick={deleteCustomer}/>
        <strong>{customer.name}</strong>
        <br />
        {customer.picture && (
          <img
            src={`https://sos.axelor.com/axelor-office/ws/rest/com.axelor.meta.db.MetaFile/${customer.picture.id}/content/download?image=true&v=0&parentId${customer.picture.id}&parentModel=com.axelor.meta.db.MetaFile`}
            alt=""
            height="100px"
          />
        )}
        <br />
        <span>{customer.code}</span>
        <address>
          {customer.address && customer.address.fullName}
        </address>
        <span>
          {customer.phone}
          <br />
          {customer.email}
          <br />
          {props.partnerCategory && props.partnerCategory.name}
          <br />
          <strong>
            <span>Sociétés</span>
          </strong>{" "}
          : {customer.companyStr}
          <br />
          <strong>
            <span>Position fiscale</span>
          </strong>{" "}
          :
          <h4 className="labels-container">
            <Label
              type={customer.fiscalPos.isCarrier}
              name="Carrier"
              color="#FF0000"
            />
            <Label
              type={customer.fiscalPos.isCustomer}
              name="Client"
              color="#EF9D3F"
            />
            <Label
              type={customer.fiscalPos.isEmployee}
              name="Employee"
              color="#5680FC"
            />
            <Label
              type={customer.fiscalPos.isFactor}
              name="Factor"
              color="#54FC62"
            />
            <Label
              type={customer.fiscalPos.isProspect}
              name="Prospect"
              color="#FC6355"
            />
            <Label
              type={customer.fiscalPos.isSubcontractor}
              name="Subcontracting"
              color="#000080"
            />
            <Label
              type={customer.fiscalPos.isSupplier}
              name="Vendor"
              color="#7D54FC"
            />
          </h4>
        </span>
      </div>
      {isEditing && (
        <ModifyCustomerForm
          setCurrentState={setIsEditing}
          setCustomerData={props.setCustomerData}
          data={customer}
          index={props.index}
        />
      )}
    </>
  );
};

export default CustomerCard;
