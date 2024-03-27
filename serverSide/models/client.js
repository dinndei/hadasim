
import mongoose from 'mongoose'
import Joi from 'joi';
const allowedProducers = ['Pfizer-BioNTech', 'Moderna', 'Novavax'];

const clientSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    idNumber: { type: String },
    address: { type: Object },
    birthDate: { type: Date, default: new Date() },
    phone: { type: String },
    selfPhone: { type: String },
    email: { type: String },
    positivRes: { type: String },
    recovery: { type: String },
    vaccinations: [{
        date: { type: Date, default: new Date() },
        producer: { type: String }
    }]
}, { timestamps: true })

export const clientValidator = (_client) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        idNumber: Joi.string().required().min(9).max(9), // Assuming ID number should have 9 characters
        address: Joi.object().keys(
            {
                city: Joi.string().required(),
                road: Joi.string().required(),
                number: Joi.number().required()
            }
        ).required(),
        birthDate: Joi.date().iso(),
        phone: Joi.string().required(),
        selfPhone: Joi.string(),
        email: Joi.string().email().required(),
        positivRes: Joi.date().iso(),
        recovery: Joi.date().iso(),
        vaccinations: Joi.array().items(Joi.object({
            date: Joi.date().iso(),
            producer: Joi.string().valid(...allowedProducers)
        }))
    });

    return schema.validate(_client);
};

export const Client = mongoose.model("client", clientSchema)