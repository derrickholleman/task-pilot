import { test, expect } from '@playwright/test';

test.describe('Delete Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('todo can be deleted', async ({ page }) => {
    const todoText = 'Task to be deleted';

    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    const deleteButton = page.getByRole('button', { name: 'Delete todo' });
    await deleteButton.click();

    // Verify the todo is removed from the page
    await expect(page.getByText(todoText)).not.toBeVisible();

    // Verify the empty state message appears again
    await expect(
      page.getByText('No todos yet. Add one to get started!'),
    ).toBeVisible();

    // Refresh the page
    await page.reload();

    // Verify the todo does not persist after refresh
    await expect(page.getByText(todoText)).not.toBeVisible();
    await expect(
      page.getByText('No todos yet. Add one to get started!'),
    ).toBeVisible();
  });
});
