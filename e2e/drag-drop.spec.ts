import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('can reorder todos by dragging and dropping', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    // Add three todos
    await input.fill('First todo');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Second todo');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Third todo');
    await page.getByRole('button', { name: 'Add' }).click();

    // Get all todo items
    const todos = page.getByTestId('todo-item').filter({
      hasText: /First todo|Second todo|Third todo/,
    });

    // Verify initial order
    await expect(todos.nth(0)).toContainText('First todo');
    await expect(todos.nth(1)).toContainText('Second todo');
    await expect(todos.nth(2)).toContainText('Third todo');

    // Drag first todo to third position
    await todos.nth(0).dragTo(todos.nth(2));

    // Verify new order - First todo should now be last
    const todosAfterDrag = page.getByTestId('todo-item').filter({
      hasText: /First todo|Second todo|Third todo/,
    });

    await expect(todosAfterDrag.nth(0)).toContainText('Second todo');
    await expect(todosAfterDrag.nth(1)).toContainText('Third todo');
    await expect(todosAfterDrag.nth(2)).toContainText('First todo');
  });

  test('drag and drop order persists after page refresh', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    // Add three todos
    await input.fill('Todo A');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Todo B');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Todo C');
    await page.getByRole('button', { name: 'Add' }).click();

    // Get all todo items
    const todos = page.getByTestId('todo-item').filter({
      hasText: /Todo A|Todo B|Todo C/,
    });

    // Drag Todo A to last position
    await todos.nth(0).dragTo(todos.nth(2));

    // Refresh the page
    await page.reload();

    // Verify order persists after refresh
    const todosAfterRefresh = page.getByTestId('todo-item').filter({
      hasText: /Todo A|Todo B|Todo C/,
    });

    await expect(todosAfterRefresh.nth(0)).toContainText('Todo B');
    await expect(todosAfterRefresh.nth(1)).toContainText('Todo C');
    await expect(todosAfterRefresh.nth(2)).toContainText('Todo A');
  });

  test('can drag todo to middle position', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    // Add three todos
    await input.fill('First');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Second');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Third');
    await page.getByRole('button', { name: 'Add' }).click();

    // Get all todo items
    const todos = page.getByTestId('todo-item').filter({
      hasText: /First|Second|Third/,
    });

    // Drag third todo to second position (middle)
    await todos.nth(2).dragTo(todos.nth(1));

    // Verify new order
    const todosAfterDrag = page.getByTestId('todo-item').filter({
      hasText: /First|Second|Third/,
    });

    await expect(todosAfterDrag.nth(0)).toContainText('First');
    await expect(todosAfterDrag.nth(1)).toContainText('Third');
    await expect(todosAfterDrag.nth(2)).toContainText('Second');
  });

  test('can drag todo from bottom to top', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a new todo...');

    // Add four todos
    await input.fill('One');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Two');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Three');
    await page.getByRole('button', { name: 'Add' }).click();

    await input.fill('Four');
    await page.getByRole('button', { name: 'Add' }).click();

    // Get all todo items
    const todos = page.getByTestId('todo-item').filter({
      hasText: /One|Two|Three|Four/,
    });

    // Drag fourth todo (last) to first position
    await todos.nth(3).dragTo(todos.nth(0));

    // Verify new order
    const todosAfterDrag = page.getByTestId('todo-item').filter({
      hasText: /One|Two|Three|Four/,
    });

    await expect(todosAfterDrag.nth(0)).toContainText('Four');
    await expect(todosAfterDrag.nth(1)).toContainText('One');
    await expect(todosAfterDrag.nth(2)).toContainText('Two');
    await expect(todosAfterDrag.nth(3)).toContainText('Three');
  });
});
