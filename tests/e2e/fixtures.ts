import { test as base } from '@playwright/test';

export type User = {
  email: string;
  password: string;
};

type Fixtures = {
  adminUser: User;
  guestUser: User;
};

// Extend basic test fixture with our app-specific ones
export const test = base.extend<Fixtures>({
  adminUser: async ({}, use) => {
    await use({
      email: 'admin@account.com',
      password: 'password'
    });
  },
  guestUser: async ({}, use) => {
    await use({
      email: 'guest@example.com',
      password: 'guestpass'
    });
  }
});

export { expect } from '@playwright/test';
