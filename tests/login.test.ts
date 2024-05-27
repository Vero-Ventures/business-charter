import { test, expect } from '@playwright/test';
import { config } from './setup/config';

test('Login with registered email and correct password', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/login`);
    const signInEmail = await page.getByPlaceholder('Email');
    const signInPassword = await page.getByPlaceholder('Password');
    await signInEmail?.fill(config.TEST_EMAIL);
    await signInPassword?.fill(config.TEST_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/decision-tree');
    await expect(page).toHaveURL(/.*\/decision-tree/, { timeout: 5000 });
    console.log('Login with registered email and correct password passed');
  } catch (error) {
    console.error('Login with registered email and correct password failed');
    throw error;
  } finally {
    await context.close();
  }
});

test('Login with unregistered email', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/login`);
    const signInEmail = await page.getByPlaceholder('Email');
    const signInPassword = await page.getByPlaceholder('Password');
    await signInEmail?.fill(config.TEST_EMAIL + 'a');
    await signInPassword?.fill(config.TEST_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText('You entered the wrong email or password')
    ).toBeVisible();
    console.log('Sign-in with unregistered email passed');
  } catch (error) {
    console.error('Sign-in with unregistered email failed');
    throw error;
  } finally {
    await context.close();
  }
});

test('Login with registered email and incorrect password', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/login`);
    const signInEmail = await page.getByPlaceholder('Email');
    const signInPassword = await page.getByPlaceholder('Password');
    await signInEmail?.fill(config.TEST_EMAIL);
    await signInPassword?.fill(config.TEST_PASSWORD + '1');
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText('You entered the wrong email or password')
    ).toBeVisible();
    console.log('Login with registered email and incorrect password passed');
  } catch (error) {
    console.error('Login with registered email and incorrect password failed');
    throw error;
  } finally {
    await context.close();
  }
});

test('Login with invalid email', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/login`);
    const signInEmail = await page.getByPlaceholder('Email');
    const signInPassword = await page.getByPlaceholder('Password');
    await signInEmail?.fill(config.TEST_EMAIL + '1');
    await signInPassword?.fill(config.TEST_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
    console.log('Login with invalid email passed');
  } catch (error) {
    console.error('Login with invalid email failed');
    throw error;
  } finally {
    await context.close();
  }
});

test('Password field with less than 8 characters displays error', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/login`);
    const signInEmail = await page.getByPlaceholder('Email');
    const signInPassword = await page.getByPlaceholder('Password');
    await signInEmail?.fill(config.TEST_EMAIL);
    await signInPassword?.fill('1234567');
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Password must be at least 8')).toBeVisible();
    console.log('Fill password field with less than 8 characters passed');
  } catch (error) {
    console.error('Fill password field with less than 8 characters failed');
    throw error;
  } finally {
    await context.close();
  }
});
