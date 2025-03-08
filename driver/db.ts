import { connect } from "mongoose";

export const db = await connect("mongodb://localhost:27017/food-order");