import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IScheduleRequest, IScheduleResponse } from '../interfaces/schedules';

const createSchudeleSerializer: SchemaOf<IScheduleRequest> = yup.object().shape({
    propertyId: yup.string().required(),
    date: yup.string().required(),
    hour: yup.string().required(),
    userId: yup.string().required()
});

const responseSchudeleSerializer: SchemaOf<IScheduleResponse> = yup.object().shape({
    id: yup.string().required(),
    userId: yup.string().required(),
    propertyId: yup.string().required(),
    date: yup.date().required(),
    hour: yup.date().required()
});

export { createSchudeleSerializer, responseSchudeleSerializer };