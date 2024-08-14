import { Expose } from "class-transformer";

export class UserDto {
    
    //by expose Even if there are more fields return only this field use with serializer
    @Expose()
    id:number;

    @Expose()
    email:string;
}