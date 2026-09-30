import type { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('Admin authentication middleware');
  const token = 'xyx';
  const isAdminAuthenticated = token === 'xyx';
  if (!isAdminAuthenticated) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('User authentication middleware');
  const token = 'abc';
  const isUserAuthenticated = token === 'abc';
  if (!isUserAuthenticated) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};
