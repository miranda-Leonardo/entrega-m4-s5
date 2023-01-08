export interface IScheduleRequest {
    propertyId: string
    date: string
    hour: string
    userId: string
}

export interface IScheduleResponse {
    id: string
    userId: string
    propertyId: string
    date: Date
    hour: Date
};