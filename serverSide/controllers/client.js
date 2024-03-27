import { Client, clientValidator } from "../models/client.js";
import mongoose from 'mongoose';
export const getClients = async (req, res) => {
    try {
        let clients = await Client.find({})
            .sort({ lastName: 1 })
        res.json(clients);
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in get clients");
    }
}
export const getClientByID = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose fitting");
        let clientWithID = await Client.findById(id).populate('vaccinations')
        if (!clientWithID)
            return res.status(404).send("no client with this id");
        res.json(clientWithID)
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in get client by id");
    }
}
export const addClient = async (req, res) => {
    const { firstName, lastName, idNumber, address, birthDate, phone, selfPhone, email,vaccinations,positivRes,recovery } = req.body
    // const { error } = clientValidator({ firstName, lastName, idNumber, address, birthDate, phone, selfPhone, email ,vaccinations,positivRes,recovery});
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    let newClient = new Client({ firstName, lastName, idNumber, address, birthDate, phone, selfPhone, email,vaccinations,positivRes,recovery })
    try {
        await newClient.save()
        res.json(newClient)

    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in add client");
    }
}
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose fitting");
        let clientWithID = await Client.findByIdAndDelete(id)
        if (!clientWithID)
            return res.status(404).send("no client with this id to delete");
        res.json(clientWithID)

    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in delete client");
    }
}
export const updateClient = async (req, res) => {
    const { firstName, lastName, address, phone, selfPhone, email} = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = await Client.findById(id)
        if (!toUpdate)
            return res.status(404).send("person not found")
            toUpdate.firstName = firstName || toUpdate.firstName;
            toUpdate.lastName = lastName || toUpdate.lastName;
            toUpdate.address = address || toUpdate.address;
            toUpdate.phone = phone || toUpdate.phone;
            toUpdate.selfPhone = selfPhone || toUpdate.selfPhone;
            toUpdate.email = email || toUpdate.email;
        
            

        // const { error } = clientValidator(toUpdate);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }
        const updatedDocument = await Client.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in update client");
    }

}

export const updateClientPositive = async (req, res) => {
    const {date} = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = await Client.findById(id)
        if (!toUpdate)
            return res.status(404).send("person not found")
           
        toUpdate.positivRes = date || toUpdate.positivRes;
        
            

        // const { error } = clientValidator(toUpdate);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }
        const updatedDocument = await Client.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in update client positive");
    }

}


export const updateClientRecovery = async (req, res) => {
    const {date} = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = await Client.findById(id)
        if (!toUpdate)
            return res.status(404).send("person not found")
           
        toUpdate.recovery = date || toUpdate.recovery;
        
            

        // const { error } = clientValidator(toUpdate);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }
        const updatedDocument = await Client.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in update client recovery");
    }

}

export const addVaccine = async (req, res) => {
    const {date,producer} = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = await Client.findById(id)
        if (!toUpdate)
            return res.status(404).send("person not found")
           
        toUpdate.vaccinations.push({date,producer});
     
        // const { error } = clientValidator(toUpdate);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }
        const updatedDocument = await Client.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in update client positive");
    }

}