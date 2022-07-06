import React from 'react'

const Label = (props) => {
    return (
        props.type && 
            <span 
                className="label" 
                style={{backgroundColor: props.color}}
            >
                {props.name}
            </span>
    )
}


const CustomerCard = (props) => {
    console.log('CC',props);
    return (
        <div className="card">
            <strong>{props.company.name}</strong>
            <br/>
            {props.company.picture && 
                <img src={`https://sos.axelor.com/axelor-office/ws/rest/com.axelor.meta.db.MetaFile/${props.company.picture.id}/content/download?image=true&v=0&parentId${props.company.picture.id}&parentModel=com.axelor.meta.db.MetaFile`} alt="" height="100px"/>
            }
            <br/>
            <span>{props.company.code}</span>
            <address>{props.company.address && props.company.address.fullName}</address>
            <span>
                {props.company.phone}
                <br/>
                {props.company.email}
                <br/>
                {props.partnerCategory && props.partnerCategory.name}
                <br/>
                <strong><span>Sociétés</span></strong> : {props.company.companyStr}
                <br/>
                <strong><span>Position fiscale</span></strong> :
                <h4 className="labels-container">
                    <Label type={props.company.fiscalPos.isCarrier} name="Carrier" color="#FF0000"/>
                    <Label type={props.company.fiscalPos.isCustomer} name="Client" color="#EF9D3F"/>
                    <Label type={props.company.fiscalPos.isEmployee} name="Employee" color="#5680FC"/>
                    <Label type={props.company.fiscalPos.isFactor} name="Factor" color="#54FC62"/>
                    <Label type={props.company.fiscalPos.isProspect} name="Prospect" color="#FC6355"/>
                    <Label type={props.company.fiscalPos.isSubcontractor} name="Subcontracting" color="#000080"/>
                    <Label type={props.company.fiscalPos.isSupplier} name="Vendor" color="#7D54FC"/>
                </h4> 
            </span>
        </div>
    )
}

export default CustomerCard