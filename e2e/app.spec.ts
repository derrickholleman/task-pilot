import { test, expect } from '@playwright/test';

test.describe('TaskPilot Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage renders default text', async ({ page }) => {
    await expect(page.getByText('TaskPilot')).toBeVisible();
    await expect(page.getByPlaceholder('Enter a new todo...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
    await expect(
      page.getByText('No todos yet. Add one to get started!'),
    ).toBeVisible();
  });
});
