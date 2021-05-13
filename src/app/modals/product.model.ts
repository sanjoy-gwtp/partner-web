// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';


export class Product {
  brand?: string;
  category?: ProductCategory;
  description?: string;
  discount?: number = 0;
  id?: number;
  name?: string;
  newPro?: boolean;
  pictures?: Picture[];
  price?: number = 0;
  sale?: boolean;
  salePrice?: number = 0;
  shortDetails?: string;
  state?: string;
  stock?: number = 0;
  type?: ProductType;

  constructor(
    brand?: string,
    category?: ProductCategory,
    description?: string,
    discount?: number,
    id?: number,
    name?: string,
    newPro?: boolean,
    pictures?: Picture[],
    price?: number,
    sale?: boolean,
    salePrice?: number,
    shortDetails?: string,
    state?: string,
    stock?: number,
    type?: ProductType
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.salePrice = salePrice;
    this.discount = discount;
    this.pictures = pictures;
    this.shortDetails = shortDetails;
    this.description = description;
    this.stock = stock;
    this.newPro = newPro;
    this.brand = brand;
    this.sale = sale;
    this.category = category;
    this.state = state;
  }
}

export class Picture {
  id: Number;
  big: string;
  bigImageName: string;
  bigImageType: string;
  small: string;
  smallImageName: string;
  smallImageType: string;
}

export class ProductCategory {
  id: Number;
  name: string;
}

export class ProductType {
  id: Number;
  name: string;
}


// Color Filter
export interface ColorFilter {
  color?: ProductColor;
}