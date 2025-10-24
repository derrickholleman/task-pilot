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
});
