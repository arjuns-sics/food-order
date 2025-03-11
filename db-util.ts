/**
 * This is a utility to populate the database with dummy food data
 * The db should have a collection called "menu" with the following structure
 * {
 *   _id: ObjectId,
 *   name: String,
 *   price: Number,
 *   description: String,
 *   image: String,
 *   categories: [String],
 *   isVeg: Boolean,
 * }
 * 
 * use pizzas.json for dummy food data
 */

import { Menu, MenuModel } from "./models/menu";

interface Item {
    id: string
    img: string
    name: string
    dsc: string
    price: number
    rate: number
    country: string
}

import pizzas from "./pizzas.json";
const menu: Menu[] = pizzas.map((pizza: Item) => ({
    id: pizza.id,
    name: pizza.name,
    price: pizza.price,
    description: pizza.dsc,
    image: pizza.img
}))

MenuModel.insertMany(menu).then(console.log);