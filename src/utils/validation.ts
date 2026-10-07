import type { Request } from 'express';

export const validateSingupData = (req: Request) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error('Missing required fields');
  }
  if (firstName.length < 4 || lastName.length < 4) {
    throw new Error('First and last name must be at least 4 characters long');
  }
};
