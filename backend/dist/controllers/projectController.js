"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const getProjects = async (req, res) => {
    try {
        const { status, category, limit, page } = req.query;
        const filter = {};
        if (status)
            filter.status = status;
        if (category)
            filter.category = category;
        const limitNum = parseInt(limit) || 0;
        const pageNum = parseInt(page) || 1;
        const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;
        const projects = await Project_1.default.find(filter)
            .sort({ createdAt: -1 })
            .limit(limitNum)
            .skip(skip);
        const total = await Project_1.default.countDocuments(filter);
        res.json({
            projects,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1
            }
        });
    }
    catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};
exports.getProjects = getProjects;
const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};
exports.getProject = getProject;
const createProject = async (req, res) => {
    try {
        const { title, description, thumbnail, link, techStack, category, status = 'draft' } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const project = new Project_1.default({
            title,
            description,
            thumbnail: thumbnail || '',
            link: link || '',
            techStack: techStack || [],
            category: category || 'general',
            status
        });
        await project.save();
        res.status(201).json(project);
    }
    catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const project = await Project_1.default.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project_1.default.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=projectController.js.map