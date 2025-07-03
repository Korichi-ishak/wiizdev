import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Email from '../models/Email';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const getEmails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, limit, page } = req.query;
    
    const filter: any = {};
    if (status) filter.status = status;

    const limitNum = parseInt(limit as string) || 0;
    const pageNum = parseInt(page as string) || 1;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const emails = await Email.find(filter)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await Email.countDocuments(filter);
    const unreadCount = await Email.countDocuments({ status: 'unread' });

    res.json({
      emails,
      unreadCount,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1
      }
    });
  } catch (error) {
    console.error('Get emails error:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

export const getEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const email = await Email.findById(id);

    if (!email) {
      res.status(404).json({ error: 'Email not found' });
      return;
    }

    // Mark as read if it's unread
    if (email.status === 'unread') {
      email.status = 'read';
      await email.save();
    }

    res.json(email);
  } catch (error) {
    console.error('Get email error:', error);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
};

export const createEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { from, name, subject, message } = req.body;

    if (!from || !name || !subject || !message) {
      res.status(400).json({ error: 'From, name, subject, and message are required' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    const email = new Email({
      from,
      name,
      subject,
      message,
      status: 'unread'
    });

    await email.save();
    res.status(201).json(email);
  } catch (error) {
    console.error('Create email error:', error);
    res.status(500).json({ error: 'Failed to create email' });
  }
};

export const updateEmailStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['unread', 'read', 'replied'].includes(status)) {
      res.status(400).json({ error: 'Valid status is required' });
      return;
    }

    const email = await Email.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!email) {
      res.status(404).json({ error: 'Email not found' });
      return;
    }

    res.json(email);
  } catch (error) {
    console.error('Update email status error:', error);
    res.status(500).json({ error: 'Failed to update email status' });
  }
};

export const replyToEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage) {
      res.status(400).json({ error: 'Reply message is required' });
      return;
    }

    const email = await Email.findById(id);
    if (!email) {
      res.status(404).json({ error: 'Email not found' });
      return;
    }

    // Send reply email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.from,
      subject: `Re: ${email.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reply from ${process.env.ADMIN_NAME || 'Admin'}</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Original Message:</strong></p>
            <p style="font-style: italic;">"${email.message}"</p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Reply:</strong></p>
            <p>${replyMessage.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            This is an automated reply from the portfolio contact system.
          </p>
        </div>
      `
    });

    // Update email status
    email.status = 'replied';
    email.replyMessage = replyMessage;
    email.repliedAt = new Date();
    await email.save();

    res.json({ message: 'Reply sent successfully', email });
  } catch (error) {
    console.error('Reply to email error:', error);
    res.status(500).json({ error: 'Failed to send reply' });
  }
};

export const deleteEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const email = await Email.findByIdAndDelete(id);

    if (!email) {
      res.status(404).json({ error: 'Email not found' });
      return;
    }

    res.json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Delete email error:', error);
    res.status(500).json({ error: 'Failed to delete email' });
  }
};

export const markAllAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    await Email.updateMany(
      { status: 'unread' },
      { status: 'read', updatedAt: new Date() }
    );

    res.json({ message: 'All emails marked as read' });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ error: 'Failed to mark all emails as read' });
  }
};