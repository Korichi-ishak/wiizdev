"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const Settings_1 = __importDefault(require("../models/Settings"));
const getSettings = async (req, res) => {
    try {
        let settings = await Settings_1.default.findOne();
        // Create default settings if none exist
        if (!settings) {
            settings = await Settings_1.default.create({});
        }
        res.json(settings);
    }
    catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Error fetching settings' });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        let settings = await Settings_1.default.findOne();
        if (!settings) {
            settings = await Settings_1.default.create(req.body);
        }
        else {
            Object.assign(settings, req.body);
            await settings.save();
        }
        res.json({ message: 'Settings updated successfully', settings });
    }
    catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Error updating settings' });
    }
};
exports.updateSettings = updateSettings;
//# sourceMappingURL=settingsController.js.map