import { Document } from 'mongoose';
export interface IUsers extends Document{
    readonly email: string;
    readonly password: string;
}