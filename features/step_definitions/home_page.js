import { chromium } from 'playwright';
import { expect } from '@playwright/test'
import { exec } from 'child_process';
import {
	After,
	Before,
	Given,
	When,
	Then,
	world
} from '@cucumber/cucumber';

Before(async (continue) => {
	world.serverProcess = exec('npm run dev', (err) => {
		if (err) console.error(err);
	});
	setTimeout(() => {
		continue();
	}, 5000);
	world.browser = await chromium.launch();
	world.page = await world.browser.newPage();
});

After(async (continue) => {
	await world.browoser.close();
	if (world.serverProcess) world.serverProcess.kill();
	continue();
});

Given('I visit the homepage', async () => {
	await world.page.goto('http://localhost:3000/');
});

Then('I should see the title \'Vite + React + TS\'', async () => {
	await expect(world.page).toHaveTitle('Vite + React + TS');
});

Then('I should see the heading \'Vite + React\'', async () => {
	await expect(world.page.getByRole('heading')).toContainText('Vite + React');
});

Then('I should see the Vite logo', async () => {
	await expect(world.page.getByRole('link', { name: 'Vite logo' })).toBeVisible();
});

Then('I should see the React logo', async () => {
	await expect(world.page.getByRole('link', { name: 'React logo' })).toBeVisible();
});
