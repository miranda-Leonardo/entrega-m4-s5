import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IPropertyRequest, IPropertyResponse, IPropertyWithAddressResponse } from '../interfaces/properties';

const createPropertySerializer: SchemaOf<IPropertyRequest> = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object({
        district: yup.string().required(),
        zipCode: yup.string().max(8).required(),
        number: yup.string().notRequired(),
        city: yup.string().required(),
        state: yup.string().max(2).required()
    }).required(),
    categoryId: yup.string().required()
});

const responsePropertyWithAddressSerializer: SchemaOf<IPropertyWithAddressResponse> = yup.object().shape({
    id: yup.string().required(),
    sold: yup.boolean().required(),
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object({
        id: yup.string().required(),
        district: yup.string().required(),
        zipCode: yup.string().required(),
        number: yup.string().notRequired(),
        city: yup.string().required(),
        state: yup.string().required()
    }).required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
});

const responsePropertySerializer: SchemaOf<IPropertyResponse> = yup.object().shape({
    id: yup.string().required(),
    sold: yup.boolean().required(),
    value: yup.number().required(),
    size: yup.number().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
});

const listPropertiesSerializer: SchemaOf<IPropertyResponse[]> = yup.array(responsePropertySerializer);

export { createPropertySerializer, responsePropertyWithAddressSerializer, responsePropertySerializer, listPropertiesSerializer };