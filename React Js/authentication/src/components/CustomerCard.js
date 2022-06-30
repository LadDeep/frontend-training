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


export const CustomerCard = (props) => {
    return (
        <div className="card">
            <strong>{props.company.name}</strong>
            <img src={`https://test.axelor.com/open-suite-master/ws/rest/com.axelor.meta.db.MetaFile/${props.imageId}/content/download?image=true&v=0&parentId${props.imageId}&parentModel=com.axelor.meta.db.MetaFile`} alt="" height="100px"/>
            <span>{props.company.registrationCode}</span>
            <address>{props.company.address}</address>
            <span>
                {props.company.fixedPhone}
                <br/>
                {props.company.email}
                <br/>
                {props.company.partnerCategory}
                <br/>
                <strong><span>Sociétés</span></strong> : {props.company.companyStr}
                <br/>
                <strong><span>Position fiscale</span></strong> :
                <h4 className="labels-container">
                    <Label type={props.company.isCarrier} name="Carrier" color="#FF0000"/>
                    <Label type={props.company.isCustomer} name="Client" color="#EF9D3F"/>
                    <Label type={props.company.isEmployee} name="Employee" color="#5680FC"/>
                    <Label type={props.company.isFactor} name="Factor" color="#54FC62"/>
                    <Label type={props.company.isProspect} name="Prospect" color="#FC6355"/>
                    <Label type={props.company.isSubcontractor} name="Subcontracting" color="#000080"/>
                    <Label type={props.company.isSupplier} name="Vendor" color="#7D54FC"/>
                </h4> 
            </span>
        </div>
    )
}
