import { chromium, expect, test } from "@playwright/test";


//npm run test
test('Dashboard', async ({  }) => {

	// Launch a browser instance
	const browser = await chromium.launch({ headless: false });

	// Create a new browser context
	const context = await browser.newContext();

	// Create a new page in the context
	const page = await context.newPage();

	await page.goto('/');

	await page.waitForNavigation();

	await page.fill('input[type="email"]', 'skullkiller58@gmail.com');
	await page.fill('input[type="password"]', '9JhNnGX2Y8Vfddp');

	await page.click('button.p-1');

	await page.waitForNavigation();

	await page.goto('/d');
	expect(await page.textContent('h4')).toBe('Dashboard');


	await page.click('#menu-button');
	await page.click('#menu-item-0');

	await page.waitForNavigation();

	expect(page.url()).toBe('http://localhost:4173/d/profile');

	const lastName = await page.$('#last_name');

	let lastname_with_random;

	if (lastName) {
		await page.fill('input#last_name', '');

		// Generate random numbers
		const randomNumbers = Math.floor(Math.random() * 100000);

		// Convert the random numbers to a string
		lastname_with_random = "Testing" + randomNumbers.toString();

		await lastName.type(lastname_with_random);
	}

	await page.click('[type="submit"]');

	await page.waitForNavigation();

	expect(page.url()).toBe('http://localhost:4173/d');

	await page.waitForTimeout(1000);

	await page.reload();

	const headingText = await page.textContent('h4#fullname.text-white');

	let lastname;
	if (headingText != null) {
		lastname = headingText.split(" ")[1];
	}
	expect(lastname).toBe(lastname_with_random);

	const linkSelector = `a[href="/d/courses"]`;

	await page.click(linkSelector);

	await page.waitForNavigation();

	expect(await page.textContent('h4')).toBe('Courses');


});





