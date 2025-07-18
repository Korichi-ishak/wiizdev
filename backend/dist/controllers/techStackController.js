"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTechStackVisibility = exports.deleteTechStackItem = exports.updateTechStackItem = exports.createTechStackItem = exports.getTechStackItem = exports.getTechStack = void 0;
const TechStack_1 = __importDefault(require("../models/TechStack"));
const getTechStack = async (req, res) => {
    try {
        const { category, limit, page, includeHidden } = req.query;
        const filter = {};
        if (category)
            filter.category = category;
        // Only show visible items unless explicitly requested to include hidden ones (for admin)
        if (includeHidden !== 'true') {
            filter.$or = [
                { visible: true },
                { visible: { $exists: false } } // Include items where visible field doesn't exist (legacy items)
            ];
        }
        const limitNum = parseInt(limit) || 0;
        const pageNum = parseInt(page) || 1;
        const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;
        const techStack = await TechStack_1.default.find(filter)
            .sort({ name: 1 })
            .limit(limitNum)
            .skip(skip);
        const total = await TechStack_1.default.countDocuments(filter);
        res.json({
            techStack,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1
            }
        });
    }
    catch (error) {
        console.error('Get tech stack error:', error);
        res.status(500).json({ error: 'Failed to fetch tech stack' });
    }
};
exports.getTechStack = getTechStack;
const getTechStackItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await TechStack_1.default.findById(id);
        if (!item) {
            res.status(404).json({ error: 'Tech stack item not found' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        console.error('Get tech stack item error:', error);
        res.status(500).json({ error: 'Failed to fetch tech stack item' });
    }
};
exports.getTechStackItem = getTechStackItem;
const createTechStackItem = async (req, res) => {
    try {
        const { name, category, icon, color, description, logoUrl, officialWebsite } = req.body;
        if (!name || !category) {
            res.status(400).json({ error: 'Name and category are required' });
            return;
        }
        const existingItem = await TechStack_1.default.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingItem) {
            res.status(400).json({ error: 'Tech stack item with this name already exists' });
            return;
        }
        const item = new TechStack_1.default({
            name,
            category,
            icon: icon || '',
            color: color || '#000000',
            description: description || '',
            logoUrl: logoUrl || '',
            officialWebsite: officialWebsite || ''
        });
        await item.save();
        res.status(201).json(item);
    }
    catch (error) {
        console.error('Create tech stack item error:', error);
        res.status(500).json({ error: 'Failed to create tech stack item' });
    }
};
exports.createTechStackItem = createTechStackItem;
const updateTechStackItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        // Check if name already exists for other items
        if (updates.name) {
            const existingItem = await TechStack_1.default.findOne({
                name: { $regex: new RegExp(`^${updates.name}$`, 'i') },
                _id: { $ne: id }
            });
            if (existingItem) {
                res.status(400).json({ error: 'Tech stack item with this name already exists' });
                return;
            }
        }
        const item = await TechStack_1.default.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!item) {
            res.status(404).json({ error: 'Tech stack item not found' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        console.error('Update tech stack item error:', error);
        res.status(500).json({ error: 'Failed to update tech stack item' });
    }
};
exports.updateTechStackItem = updateTechStackItem;
const deleteTechStackItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await TechStack_1.default.findByIdAndDelete(id);
        if (!item) {
            res.status(404).json({ error: 'Tech stack item not found' });
            return;
        }
        res.json({ message: 'Tech stack item deleted successfully' });
    }
    catch (error) {
        console.error('Delete tech stack item error:', error);
        res.status(500).json({ error: 'Failed to delete tech stack item' });
    }
};
exports.deleteTechStackItem = deleteTechStackItem;
const toggleTechStackVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the current item first
        const currentItem = await TechStack_1.default.findById(id);
        if (!currentItem) {
            res.status(404).json({ error: 'Tech stack item not found' });
            return;
        }
        // Toggle the visibility (default to true if not set)
        const newVisibility = currentItem.visible === false ? true : false;
        const item = await TechStack_1.default.findByIdAndUpdate(id, { visible: newVisibility, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!item) {
            res.status(404).json({ error: 'Tech stack item not found' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        console.error('Toggle tech stack visibility error:', error);
        res.status(500).json({ error: 'Failed to toggle tech stack visibility' });
    }
};
exports.toggleTechStackVisibility = toggleTechStackVisibility;
//# sourceMappingURL=techStackController.js.map