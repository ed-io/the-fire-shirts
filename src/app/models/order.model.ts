import { Shirt } from "./shirts.model";

export interface Order {
    id: string;
    full_name: string;
    phone: string;
    payment_method: string;
    payment_date: string;
    shirts: Shirt[];
    created_at?: string;
}
