import { test, expect } from '@playwright/test';

test.describe('Todos Count', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('count is not visible when there are no todos', async ({ page }) => {
    const count = page.getByText(/\d+ items? left/);
    await expect(count).not.toBeVisible();
  });

  test('count shows "1 item left" when there is one active todo', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    const count = page.getByText('1 item left');
    await expect(count).toBeVisible();
  });

  test('count shows "2 items left" when there are two active todos', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    const count = page.getByText('2 items left');
    await expect(count).toBeVisible();
  });

  test('count decreases when a todo is marked as complete', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Walk the dog');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify count shows 3 items
    await expect(page.getByText('3 items left')).toBeVisible();

    // Mark one todo as complete
    const checkbox = page
      .getByRole('checkbox', { name: 'Mark todo as complete' })
      .first();
    await checkbox.check();

    // Verify count now shows 2 items
    await expect(page.getByText('2 items left')).toBeVisible();
    await expect(page.getByText('3 items left')).not.toBeVisible();
  });

  test('count increases when a completed todo is unmarked', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    // Mark one todo as complete
    const checkbox = page
      .getByRole('checkbox', { name: 'Mark todo as complete' })
      .first();
    await checkbox.check();

    // Verify count shows 1 item
    await expect(page.getByText('1 item left')).toBeVisible();

    // Unmark the completed todo
    await checkbox.uncheck();

    // Verify count now shows 2 items
    await expect(page.getByText('2 items left')).toBeVisible();
    await expect(page.getByText('1 item left')).not.toBeVisible();
  });

  test('count disappears when all todos are completed', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify count shows 2 items
    await expect(page.getByText('2 items left')).toBeVisible();

    // Mark all todos as complete
    const checkboxes = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });
    await checkboxes.first().check();
    await checkboxes.last().check();

    // Verify count is no longer visible
    const count = page.getByText(/\d+ items? left/);
    await expect(count).not.toBeVisible();
  });

  test('count updates when a todo is deleted', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Walk the dog');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify count shows 3 items
    await expect(page.getByText('3 items left')).toBeVisible();

    // Delete one active todo
    const deleteButton = page
      .getByRole('button', { name: 'Delete todo' })
      .first();
    await deleteButton.click();

    // Verify count now shows 2 items
    await expect(page.getByText('2 items left')).toBeVisible();
    await expect(page.getByText('3 items left')).not.toBeVisible();
  });

  test('count is not visible on the Completed tab', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify count is visible on All tab (default)
    await expect(page.getByText('2 items left')).toBeVisible();

    // Switch to Completed tab
    await page.getByRole('tab', { name: 'Completed' }).click();

    // Verify count is not visible on Completed tab
    const count = page.getByText('2 items left');
    await expect(count).not.toBeVisible();
  });

  test('count is visible on the Active tab', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    // Switch to Active tab
    await page.getByRole('tab', { name: 'Active' }).click();

    // Verify count is visible on Active tab
    await expect(page.getByText('2 items left')).toBeVisible();

    // Mark one todo as complete
    const checkbox = page
      .getByRole('checkbox', { name: 'Mark todo as complete' })
      .first();
    await checkbox.check();

    // Verify count updates to 1 item
    await expect(page.getByText('1 item left')).toBeVisible();
  });

  test('count persists after page refresh', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify count shows 2 items
    await expect(page.getByText('2 items left')).toBeVisible();

    await page.reload();

    // Verify count still shows 2 items
    await expect(page.getByText('2 items left')).toBeVisible();
  });

  test('count reflects only active todos when some are completed', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    // Add 5 todos
    for (let i = 1; i <= 5; i++) {
      await input.fill(`Todo ${i}`);
      await page.getByRole('button', { name: 'Add' }).click();
    }

    // Verify count shows 5 items
    await expect(page.getByText('5 items left')).toBeVisible();

    // Mark 2 todos as complete
    const checkboxes = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    // Verify count shows 3 items left (5 - 2 completed)
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(page.getByText('5 items left')).not.toBeVisible();
  });
});
