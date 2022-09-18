import { Transform } from "class-transformer";
import { ObjectId } from "mongodb";

export class Receipt {
    @Transform(params => params.obj._id)
    _id?: ObjectId;
    category: string;
    title: string;
    cost: number;
    createdDateTime: Date;
}
