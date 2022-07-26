import { rest, setBaseURL, getBaseURL, setCsrf } from "./axios";
const SUCCESS = 200;

export const api = {
  login: async (username, password) => {
    let isUserValid;
    setBaseURL("/axelor-office");
    await rest
      .post("/callback", { username, password })
      .then((response) => {
        if (response.status === SUCCESS) {
          isUserValid = true;
          setCsrf();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    return isUserValid;
  },
  getUserInfo: async () => {
    let userData;
    await rest
      .get("/ws/app/info")
      .then((response) => {
        if (response.status === SUCCESS)
          userData = {
            id: response.data["user.id"],
            name: response.data["user.name"],
            lang: response.data["user.lang"],
            profileImg: `${getBaseURL()}/${response.data["user.image"]}`,
            type: response.data["user.login"],
          };
      })
      .catch((error) => {
        console.log(error);
      });
    return userData;
  },
  fetchCustomerList: async () => {
    let fetchedResult = [];
    await rest
      .post("/ws/rest/com.axelor.apps.base.db.Partner/search", {
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
      })
      .then((response) => {
        const customerArray = response.data["data"];
        customerArray.map((customer) => fetchedResult.push(customer));
      })
      .catch((error) => {
        console.log(error);
      });
    return fetchedResult;
  },

  deleteData: async (companyId, version) => {
    await rest.post("/ws/rest/com.axelor.apps.base.db.Partner/removeAll", {
      records: [
        {
          id: companyId,
          version: version,
        },
      ],
    });
  },
  submitData: async (currentCustomer) => {
    await rest.post("/ws/rest/com.axelor.apps.base.db.Partner", {
      data: currentCustomer,
    });
  },

  uploadImage: async (file) => {
    let id;
    await rest
      .post(
        "/ws/rest/com.axelor.meta.db.MetaFile/upload",
        {
          file: file,
          field: `${undefined}`,
          request: `${JSON.stringify({
            data: {
              data: {
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                $upload: { file: {} },
              },
            },
          })}`,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.status === 0) {
          id = response.data.data[0].id;
        }
      });
    return id;
  },
  getPartnerCategories: async () => {
    let categories;
    await rest
      .post("/ws/rest/com.axelor.apps.base.db.PartnerCategory/search", {
        fields: ["id", "name", "code"],
        sortBy: null,
        data: {
          _domainContext: {},
        },
        limit: 10,
        offset: 0,
        translate: true,
      })
      .then((response) => {
        if (response.status === SUCCESS) {
          console.log(response.data["data"]);
          categories = response.data["data"];
        }
      });
    return categories;
  },
  fetchCurrentCustomer: async (selectedCustomerId) => {
    let customer;
    await rest
      .post("/ws/rest/com.axelor.apps.base.db.Partner/search", {
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
          "name",
          "parentId",
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
      })
      .then((response) => {
        const customerArray = response.data["data"];
        customer = customerArray.filter(
          (customer) => customer.id === selectedCustomerId
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return customer[0];
  },
};
