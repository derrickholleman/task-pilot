import { test, expect } from '@playwright/test';

test.describe('Todo Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('All tab is selected by default', async ({ page }) => {
    const allTab = page.getByRole('tab', { name: 'All' });
    const activeTab = page.getByRole('tab', { name: 'Active' });
    const completedTab = page.getByRole('tab', { name: 'Completed' });

    // Check that All tab is selected
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Check that other tabs are not selected
    await expect(activeTab).toHaveAttribute('aria-selected', 'false');
    await expect(completedTab).toHaveAttribute('aria-selected', 'false');
  });

  test('adding a todo makes it show up under Active but not Completed', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify todo shows up in All tab (default)
    await expect(page.getByText('Buy groceries')).toBeVisible();

    await page.getByRole('tab', { name: 'Active' }).click();

    // Verify todo shows up in Active tab
    await expect(page.getByText('Buy groceries')).toBeVisible();

    await page.getByRole('tab', { name: 'Completed' }).click();

    // Verify todo does NOT show up in Completed tab
    await expect(page.getByText('Buy groceries')).not.toBeVisible();
    await expect(
      page.getByText('No todos yet. Add one to get started!'),
    ).toBeVisible();
  });

  test('marking a todo as complete makes it show up under Completed but not Active', async ({
    page,
  }) => {
    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill('Clean the house');
    await page.getByRole('button', { name: 'Add' }).click();

    // Mark the todo as complete using the checkbox
    const checkbox = page.getByRole('checkbox', {
      name: 'Mark todo as complete',
    });
    await checkbox.check();

    await page.getByRole('tab', { name: 'Active' }).click();

    // Verify todo does NOT show up in Active tab
    await expect(page.getByText('Clean the house')).not.toBeVisible();
    await expect(
      page.getByText('No todos yet. Add one to get started!'),
    ).toBeVisible();

    await page.getByRole('tab', { name: 'Completed' }).click();

    // Verify todo shows up in Completed tab
    const completedTodo = page.getByText('Clean the house');
    await expect(completedTodo).toBeVisible();
    await expect(completedTodo).toHaveClass(/line-through/);
  });
});
