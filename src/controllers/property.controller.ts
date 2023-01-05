import { Request, Response } from 'express';
import { IPropertyRequest } from '../interfaces/properties';
import { createPropertyService } from '../services/properties/createProperty.service';

const createPropertyController = async ( req: Request, res: Response ) => {
    const propertyData: IPropertyRequest = req.body;
    const createdProperty = await createPropertyService(propertyData);
    return res.status(201).json(createdProperty);
};

export { createPropertyController };