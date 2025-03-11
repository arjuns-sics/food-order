import express from "express";
import { MenuModel } from "../models/menu";
export const MenuRouter = express.Router();
MenuRouter.get("/", (req, res) => {
    MenuModel.find({}).then((menus) => {
        res.json(menus);
    });
});

MenuRouter.get("/:id", (req, res) => {
    MenuModel.findById(req.params.id).then((menu) => {
        res.json(menu);
    });
});
