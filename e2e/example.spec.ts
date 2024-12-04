import type Page from '@playwright/test';
import { 
  test, 
  expect
} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('Home Page', () => {
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('Vite + React + TS');
  });

  test('has heading', async ({ page }) => {
    await expect(page.getByRole('heading')).toContainText('Vite + React');
  });

  test('has Vite logo', async ({ page }) =>  {
    await expect(page.getByRole('link', { name: 'Vite logo' })).toBeVisible();
  });

  test('has Rest logo', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'React logo' })).toBeVisible();
  });

  test('Vite logo click opens popup to vite.dev', async ({ page }) => {
    const vitePagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Vite logo' }).click();
    const vitePage = await vitePagePromise;
    await expect(vitePage).toHaveTitle('Vite | Next Generation Frontend Tooling');
  });

  test('React logo click opens popup to react.dev', async ({ page }) => {
    const reactPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'React logo' }).click();
    const reactPage = await reactPagePromise;
    await expect(reactPage).toHaveTitle('React');
  });

  test('count starts at 0', async ({ page }) => {
    await expect(page.getByRole('button')).toContainText('count is 0');
  });
});
