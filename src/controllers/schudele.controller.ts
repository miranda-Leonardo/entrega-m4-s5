import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import { createSchudeleService } from "../services/schudeles/createSchudele.service";

const createSchudeleController = async ( req: Request, res: Response ) => {
    const schudeleData: IScheduleRequest = {...req.body, userId: req.user.id};
    const createdSchudele = await createSchudeleService( schudeleData );
    return res.status(201).json(createdSchudele);
};

export { createSchudeleController };