import { test, expect } from '@playwright/test';
import { config } from './setup/config';

test('Signup test with existing email', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/signup`);
    const signUpEmail = await page.getByPlaceholder('Email');
    const signUpPassword = await page.getByPlaceholder('Password', {
      exact: true,
    });
    const signUpPasswordConfirm = await page.getByPlaceholder(
      'Confirm Your Password'
    );
    await signUpEmail?.fill(config.TEST_EMAIL);
    await signUpPassword?.fill(config.TEST_PASSWORD);
    await signUpPasswordConfirm?.fill(config.TEST_PASSWORD);
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('There was an error creating')).toBeVisible();
    console.log('Signup test with existing email passed');
  } catch (error) {
    console.error('Signup test with existing email failed');
    throw error;
  } finally {
    context.close();
  }
});

test('Signup test with mismatched passwords', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/signup`);
    const signUpEmail = await page.getByPlaceholder('Email');
    const signUpPassword = await page.getByPlaceholder('Password', {
      exact: true,
    });
    const signUpPasswordConfirm = await page.getByPlaceholder(
      'Confirm Your Password'
    );
    await signUpEmail?.fill(config.TEST_EMAIL);
    await signUpPassword?.fill(config.TEST_PASSWORD);
    await signUpPasswordConfirm?.fill(config.TEST_PASSWORD + '1');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Passwords do not match')).toBeVisible();
    console.log('Signup test with mismatched passwords passed');
  } catch (error) {
    console.error('Signup test with mismatched passwords failed');
    throw error;
  } finally {
    context.close();
  }
});

test('Signup test with empty email', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/signup`);
    const signUpPassword = await page.getByPlaceholder('Password', {
      exact: true,
    });
    const signUpPasswordConfirm = await page.getByPlaceholder(
      'Confirm Your Password'
    );
    await signUpPassword?.fill(config.TEST_PASSWORD);
    await signUpPasswordConfirm?.fill(config.TEST_PASSWORD);
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText('Please enter a valid email address.')
    ).toBeVisible();
    console.log('Signup test with empty email passed');
  } catch (error) {
    console.error('Signup test with empty email failed');
    throw error;
  } finally {
    context.close();
  }
});

test('Signup test with invalid email', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/signup`);
    const signUpEmail = await page.getByPlaceholder('Email');
    const signUpPassword = await page.getByPlaceholder('Password', {
      exact: true,
    });
    const signUpPasswordConfirm = await page.getByPlaceholder(
      'Confirm Your Password'
    );
    await signUpEmail?.fill(config.TEST_EMAIL + '1');
    await signUpPassword?.fill(config.TEST_PASSWORD);
    await signUpPasswordConfirm?.fill(config.TEST_PASSWORD);
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText('Please enter a valid email address.')
    ).toBeVisible();
    console.log('Signup test with invalid email passed');
  } catch (error) {
    console.error('Signup test with invalid email failed');
    throw error;
  } finally {
    context.close();
  }
});

test('Signup test with password less than 8 characters long', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/signup`);
    const signUpEmail = await page.getByPlaceholder('Email');
    const signUpPassword = await page.getByPlaceholder('Password', {
      exact: true,
    });
    const signUpPasswordConfirm = await page.getByPlaceholder(
      'Confirm Your Password'
    );
    await signUpEmail?.fill(config.TEST_EMAIL);
    await signUpPassword?.fill('1234567');
    await signUpPasswordConfirm?.fill('1234567');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText('Password must be at least 8 characters long').nth(0)
    ).toBeVisible();
    await expect(
      page.getByText('Password must be at least 8 characters long').nth(1)
    ).toBeVisible();
    console.log('Signup test with password less than 8 characters long passed');
  } catch (error) {
    console.error(
      'Signup test with password less than 8 characters long failed'
    );
    throw error;
  } finally {
    context.close();
  }
});
