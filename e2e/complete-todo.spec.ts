import { test, expect } from '@playwright/test';

test.describe('Complete Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('checkbox appears and is not checked by default', async ({ page }) => {
    const todoText = 'Test todo item';

    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify checkbox is visible
    const checkbox = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });
    await expect(checkbox).toBeVisible();

    // Verify checkbox is not checked by default
    await expect(checkbox).not.toBeChecked();
  });

  test('clicking checkbox checks it and adds strikethrough', async ({
    page,
  }) => {
    const todoText = 'Complete this task';

    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    const checkbox = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });

    // Click the checkbox to mark as complete
    await checkbox.click();

    // Verify checkbox is now checked
    await expect(checkbox).toBeChecked();

    // Verify the todo text has line-through class
    const todoTextElement = page.locator('p', { hasText: todoText });
    await expect(todoTextElement).toHaveClass(/line-through/);

    // Click again to uncheck
    await checkbox.click();

    // Verify checkbox is unchecked
    await expect(checkbox).not.toBeChecked();

    // Verify the line-through class is removed
    await expect(todoTextElement).not.toHaveClass(/line-through/);
  });

  test('clear completed button removes all completed todos', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    // Add three todos
    await input.fill('Todo 1');
    await page.getByRole('button', { name: 'Add' }).click();
    await input.fill('Todo 2');
    await page.getByRole('button', { name: 'Add' }).click();
    await input.fill('Todo 3');
    await page.getByRole('button', { name: 'Add' }).click();

    // Mark first two todos as completed
    const checkboxes = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    await page.getByRole('tab', { name: 'Completed' }).click();

    // Verify Clear Completed button is visible
    const clearButton = page.getByRole('button', { name: 'Clear Completed' });
    await expect(clearButton).toBeVisible();

    // Verify two completed todos are visible
    await expect(page.getByText('Todo 1')).toBeVisible();
    await expect(page.getByText('Todo 2')).toBeVisible();

    await clearButton.click();

    // Verify completed todos are gone
    await expect(page.getByText('Todo 1')).not.toBeVisible();
    await expect(page.getByText('Todo 2')).not.toBeVisible();

    // Verify Clear Completed button is now hidden (no completed todos left)
    await expect(clearButton).not.toBeVisible();

    // Switch to Active tab and verify Todo 3 still exists
    await page.getByRole('tab', { name: 'Active' }).click();
    await expect(page.getByText('Todo 3')).toBeVisible();
  });

  test('clear completed button is only visible on Completed tab with completed todos', async ({
    page,
  }) => {
    const clearButton = page.getByRole('button', { name: 'Clear Completed' });

    // Button should not be visible on All tab with no todos
    await expect(clearButton).not.toBeVisible();

    // Add a todo
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill('Test todo');
    await page.getByRole('button', { name: 'Add' }).click();

    // Clear button should not be visible yet with active todos
    await expect(clearButton).not.toBeVisible();

    await page.getByRole('tab', { name: 'Active' }).click();
    await expect(clearButton).not.toBeVisible();

    await page.getByRole('tab', { name: 'Completed' }).click();
    await expect(clearButton).not.toBeVisible();

    // Go back to All tab and complete the todo
    await page.getByRole('tab', { name: 'All' }).click();
    const checkbox = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });
    await checkbox.check();

    // Switch to Completed tab and verify button is now visible
    await page.getByRole('tab', { name: 'Completed' }).click();
    await expect(clearButton).toBeVisible();
  });
});
