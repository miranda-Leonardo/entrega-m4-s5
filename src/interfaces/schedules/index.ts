export interface IScheduleRequest {
    userId: string
    propertyId: string
    date: string
    hour: string
}

export interface IScheduleResponse {
    id: string
    userId: string
    propertyId: string
    date: Date
    hour: Date
};