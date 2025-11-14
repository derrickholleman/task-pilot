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

  test('todo displays creation timestamp', async ({ page }) => {
    const todoText = 'Buy groceries';
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    // Get the current date/time for comparison
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    const year = now.getFullYear();

    // Verify timestamp contains current month, day, and year
    const todoItem = page
      .getByTestId('todo-item')
      .filter({ hasText: todoText });
    await expect(todoItem).toContainText(month);
    await expect(todoItem).toContainText(day.toString());
    await expect(todoItem).toContainText(year.toString());

    // Verify timestamp is visible and formatted correctly (contains AM or PM)
    const timestampPattern = /(AM|PM)/;
    await expect(todoItem.getByText(timestampPattern)).toBeVisible();
  });
});
