import { Request, Response } from 'express';
import TechStack from '../models/TechStack';

export const getTechStack = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, limit, page, includeHidden } = req.query;
    
    const filter: any = {};
    if (category) filter.category = category;
    
    // Only show visible items unless explicitly requested to include hidden ones (for admin)
    if (includeHidden !== 'true') {
      filter.$or = [
        { visible: true },
        { visible: { $exists: false } } // Include items where visible field doesn't exist (legacy items)
      ];
    }

    const limitNum = parseInt(limit as string) || 0;
    const pageNum = parseInt(page as string) || 1;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const techStack = await TechStack.find(filter)
      .sort({ name: 1 })
      .limit(limitNum)
      .skip(skip);

    const total = await TechStack.countDocuments(filter);

    res.json({
      techStack,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1
      }
    });
  } catch (error) {
    console.error('Get tech stack error:', error);
    res.status(500).json({ error: 'Failed to fetch tech stack' });
  }
};

export const getTechStackItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await TechStack.findById(id);

    if (!item) {
      res.status(404).json({ error: 'Tech stack item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error('Get tech stack item error:', error);
    res.status(500).json({ error: 'Failed to fetch tech stack item' });
  }
};

export const createTechStackItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, icon, color, description, logoUrl, officialWebsite } = req.body;

    if (!name || !category) {
      res.status(400).json({ error: 'Name and category are required' });
      return;
    }

    const existingItem = await TechStack.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingItem) {
      res.status(400).json({ error: 'Tech stack item with this name already exists' });
      return;
    }

    const item = new TechStack({
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
  } catch (error) {
    console.error('Create tech stack item error:', error);
    res.status(500).json({ error: 'Failed to create tech stack item' });
  }
};

export const updateTechStackItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if name already exists for other items
    if (updates.name) {
      const existingItem = await TechStack.findOne({ 
        name: { $regex: new RegExp(`^${updates.name}$`, 'i') },
        _id: { $ne: id }
      });
      if (existingItem) {
        res.status(400).json({ error: 'Tech stack item with this name already exists' });
        return;
      }
    }

    const item = await TechStack.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404).json({ error: 'Tech stack item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error('Update tech stack item error:', error);
    res.status(500).json({ error: 'Failed to update tech stack item' });
  }
};

export const deleteTechStackItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await TechStack.findByIdAndDelete(id);

    if (!item) {
      res.status(404).json({ error: 'Tech stack item not found' });
      return;
    }

    res.json({ message: 'Tech stack item deleted successfully' });
  } catch (error) {
    console.error('Delete tech stack item error:', error);
    res.status(500).json({ error: 'Failed to delete tech stack item' });
  }
};

export const toggleTechStackVisibility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Find the current item first
    const currentItem = await TechStack.findById(id);
    if (!currentItem) {
      res.status(404).json({ error: 'Tech stack item not found' });
      return;
    }

    // Toggle the visibility (default to true if not set)
    const newVisibility = currentItem.visible === false ? true : false;

    const item = await TechStack.findByIdAndUpdate(
      id,
      { visible: newVisibility, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404).json({ error: 'Tech stack item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error('Toggle tech stack visibility error:', error);
    res.status(500).json({ error: 'Failed to toggle tech stack visibility' });
  }
};