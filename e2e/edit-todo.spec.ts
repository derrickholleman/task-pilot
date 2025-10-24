import { test, expect } from '@playwright/test';

test.describe('Edit Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('todo can be edited and saved', async ({ page }) => {
    const originalText = 'Original todo text';
    const updatedText = 'Updated todo text';

    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(originalText);
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify original text is visible
    await expect(page.getByText(originalText)).toBeVisible();

    // Click the edit button
    const editButton = page.getByRole('button', { name: 'Edit todo' });
    await editButton.click();

    // Verify edit input appears and is focused
    const editInput = page.getByRole('textbox', { name: 'Edit todo text' });
    await expect(editInput).toBeVisible();
    await expect(editInput).toBeFocused();

    // Clear and type new text
    await editInput.clear();
    await editInput.fill(updatedText);

    // Click save button
    const saveButton = page.getByRole('button', { name: 'Save todo' });
    await saveButton.click();

    // Verify updated text is visible
    await expect(page.getByText(updatedText)).toBeVisible();

    // Verify original text is no longer visible
    await expect(page.getByText(originalText)).not.toBeVisible();

    // Verify edit input is no longer visible
    await expect(editInput).not.toBeVisible();

    // Refresh the page
    await page.reload();

    // Verify the updated text persists after refresh
    await expect(page.getByText(updatedText)).toBeVisible();
    await expect(page.getByText(originalText)).not.toBeVisible();
  });

  test('editing todo can be canceled', async ({ page }) => {
    const originalText = 'Todo to be edited';
    const attemptedText = 'This should not be saved';

    const input = page.getByPlaceholder('Enter a new todo...');
    await input.fill(originalText);
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify original text is visible
    await expect(page.getByText(originalText)).toBeVisible();

    // Click the edit button
    const editButton = page.getByRole('button', { name: 'Edit todo' });
    await editButton.click();

    // Verify edit input appears
    const editInput = page.getByRole('textbox', { name: 'Edit todo text' });
    await expect(editInput).toBeVisible();

    // Type new text but don't save
    await editInput.clear();
    await editInput.fill(attemptedText);

    // Click cancel button
    const cancelButton = page.getByRole('button', { name: 'Cancel edit' });
    await cancelButton.click();

    // Verify edit input is no longer visible
    await expect(editInput).not.toBeVisible();

    // Verify original text is still visible
    await expect(page.getByText(originalText)).toBeVisible();

    // Verify attempted text is not visible
    await expect(page.getByText(attemptedText)).not.toBeVisible();
  });
});
