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

  test('add button is disabled by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  test('todo is able to be created', async ({ page }) => {
    const todoText = 'Buy groceries';
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(todoText);

    const addButton = page.getByRole('button', { name: 'Add' });
    await addButton.click();

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
