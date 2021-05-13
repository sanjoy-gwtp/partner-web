// import { Product } from "./product.model";

export class Order {
    id: Number;
    customer: string;
    items: any[] = [];
    paymentChanel: string;
    paymentReference: string;
    salesPrice: number;
    txnStatus: string = 'SUCCEED';
    orderStatus: string = 'PENDING';
    deliveryAddress: DeliveryAddress
}
export class DeliveryAddress {
    id: Number;
    address: string;
    city: string;
    company: string;
    country: string;
    email: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    postalCode: string;
}