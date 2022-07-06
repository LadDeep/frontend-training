import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Profile from "../components/Profile";
import CustomerCard from '../components/CustomerCard';
import axios from "axios";

const Home = (props) => {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState([]);
    
    useEffect(()=>{
      const fetchCustomerData = () => {
        axios
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
            baseURL: "https://sos.axelor.com/axelor-office",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRF-Token": localStorage.getItem("X-CSRF Token"),
            },
            withCredentials: true,
          }
          )
          .then((response) => {
            const fetchedResult = [];
            const customerArray = response.data["data"];
            for (let i = 0; i < customerArray.length; i++) {
              const customer = customerArray[i];
              const customerData = {
                id: customer.id,
                picture: customer.picture,
                name: customer.fullName,
                code: customer.registrationCode,
                address: customer.mainAddress,
                phone: customer.fixedPhone,
                partnerCategory: customer.partnerCategory,
                companyStr: customer.companyStr,
                fiscalPos: {
                  isCustomer: customer.isCarrier,
                  isCarrier: customer.isCustomer,
                  isEmployee: customer.isEmployee,
                  isFactor: customer.isFactor,
                  isProspect: customer.isProspect,
                  isSubcontractor: customer.isSubcontractor,
                  isSupplier: customer.isSupplier
                }
              }
              fetchedResult.push(customerData);
            }
            setCustomerData(fetchedResult);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      fetchCustomerData();
    }, [])

    const handleLogout = ()=>{
        props.logOut();
        navigate('/login');
    }
    console.log('Home',customerData );
    return (
        <div className="col-2">
            <div className="content">
                <h1 className="heading">Home Page</h1>
                {
                    customerData && customerData.map((customer)=>
                        (
                          <CustomerCard key={customer.id} company={customer}/>
                        )
                    )
                }
            </div>
            <div className="user-profile">
                <Profile user={props.userData}/>
                <button className="btn" type="button" onClick={handleLogout}>Logout</button>      
            </div>

        </div>
    )
}

export default Home
