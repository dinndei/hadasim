import axios from "axios";
let baseUrl = "http://localhost:5000/cl";
export const getClients = () => {
    try {
        return axios.get(baseUrl);

    } catch (error) {
        console.error("Error fetching clients:", error);
    }
}
export const getClientById = async (id) => {
    try {
        return await axios.get(`${baseUrl}/${id}`)
    }
    catch (error) {
        console.error("Error fetching clients:", error);
    }
}
export const deleteClient = (id) => {
    try { return axios.delete(`${baseUrl}/${id}`) }
    catch (error) {
        console.error("Error deleting clients:", error);
    }
}
export const updateClient = (id,data) => {
    let {
        firstName,
        lastName,
        address,
        phone,
        selfPhone,
        email
    }=data;
    let body = {
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "phone": phone,
        "selfPhone": selfPhone,
        "email": email
    }
    try { return axios.put(`${baseUrl}/${id}`, body) }
    catch (error) {
        console.error("Error updating clients:", error);
    }
}
export const updatePositive = (id,date) => {
   
    let body = {
        "date": date,
    }
    try { return axios.put(`${baseUrl}/pos/${id}`, body) }
    catch (error) {
        console.error("Error updating positive result:", error);
    }
}
export const updateRecovery = (id,date) => {
   
    let body = {
        "date": date,
    }
    try { return axios.put(`${baseUrl}/rec/${id}`, body) }
    catch (error) {
        console.error("Error updating recovery:", error);
    }
}
export const addVaccine = (id,date,prod) => {
   
    let body = {
        "date": date,
        "producer":prod
    }
    try { return axios.put(`${baseUrl}/vac/${id}`, body) }
    catch (error) {
        console.error("Error updating recovery:", error);
    }
}
export const addClient = (data) => {
const {firstName, lastName, idNumber, address, birthDate, phone, selfPhone, email, vaccinations, positivRes, recovery}=data;
    let body = {
        "firstName": firstName,
        "lastName": lastName,
        "idNumber": idNumber,
        "address": address,
        "birthDate": birthDate,
        "phone": phone,
        "selfPhone": selfPhone,
        "email": email,
        "vaccinations": vaccinations,
        "positiveRes": positivRes,
        "recovery": recovery
    }
    try {
        return axios.post(baseUrl, body);
    }
    catch (error) {
        console.error("Error fetching clients:", error);
    }
}