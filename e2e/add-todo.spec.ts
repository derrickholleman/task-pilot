import { test, expect } from '@playwright/test';

test.describe('Add Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('add button is disabled by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  test('todo is able to be created', async ({ page }) => {
    const todoText = 'Buy groceries';
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(todoText);
    // Press Enter to submit
    await input.press('Enter');

    // Verify the todo appears on the page
    await expect(page.getByText(todoText)).toBeVisible();

    // Verify the empty state message is no longer visible
    await expect(
      page.getByText('No todos yet. Add one to get started!'),
    ).not.toBeVisible();

    // Verify the input field is cleared
    await expect(input).toHaveValue('');

    await page.reload();

    // Verify the todo persists after refresh
    await expect(page.getByText(todoText)).toBeVisible();
  });
});
