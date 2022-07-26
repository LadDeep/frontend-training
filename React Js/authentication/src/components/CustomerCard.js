import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { getBaseURL } from "../util/axios";

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
  const customer = props.company;
  const navigate = useNavigate();

  const deleteCustomer = (event) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("Delete Current prop", customer.id);
      props.handleDelete(customer.id, customer.version);
    }
    event.stopPropagation();
  };

  return (
    <>
      <div
        className="card"
        onClick={() => {
          navigate(`/edit/${customer.id}`);
        }}
      >
        <Box onClick={deleteCustomer}>
          <DeleteIcon sx={{ float: "right", "&:hover": { color: "red" } }} />
        </Box>
        <strong>{customer.fullName}</strong>
        <br />
        {customer.picture && (
          <img
            src={
              customer.picture && customer.picture.id
                ? `${getBaseURL()}/ws/rest/com.axelor.meta.db.MetaFile/${customer.picture.id}/content/download?image=true&v=0&parentId${customer.picture.id}&parentModel=com.axelor.meta.db.MetaFile`
                : `${getBaseURL()}/img/company-default.jpg`
            }
            alt=""
            height="100px"
          />
        )}
        <br />
        <span>{customer.registrationCode}</span>
        <address>
          {customer.mainAddress && customer.mainAddress.fullName}
        </address>
        <span>
          {customer.fixedPhone}
          <br />
          {customer["emailAddress.address"] && customer["emailAddress.address"]}
          <br />
          {customer.partnerCategory && customer.partnerCategory.name}
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
            <Label type={customer.isCarrier} name="Carrier" color="#FF0000" />
            <Label type={customer.isCustomer} name="Client" color="#EF9D3F" />
            <Label type={customer.isEmployee} name="Employee" color="#5680FC" />
            <Label type={customer.isFactor} name="Factor" color="#54FC62" />
            <Label type={customer.isProspect} name="Prospect" color="#FC6355" />
            <Label
              type={customer.isSubcontractor}
              name="Subcontracting"
              color="#000080"
            />
            <Label type={customer.isSupplier} name="Vendor" color="#7D54FC" />
          </h4>
        </span>
      </div>
    </>
  );
};

export default CustomerCard;
