import path from 'path';
import fs from 'fs/promises';

export const uploadDir = path.join(process.cwd(), 'uploads');

export const ensureUploadDir = async () => {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export const saveFile = async (filename: string, data: Buffer): Promise<string> => {
  await ensureUploadDir();
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, data);
  return filepath;
};

export const deleteFile = async (filename: string): Promise<void> => {
  const filepath = path.join(uploadDir, filename);
  try {
    await fs.unlink(filepath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};