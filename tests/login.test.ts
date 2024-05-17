import { test, chromium } from '@playwright/test';
import { config } from './config';

// For testing existing email
const testData = {
  email: 'jyoon72@my.bcit.ca',
  password: '12345678',
};

test('Login with registered email and correct password', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${config.BASE_URL}/login`);

  const signInEmail = await page.$('input[name="email"]');
  const signInPassword = await page.$('input[name="password"]');

  await signInEmail?.fill(testData.email);
  await signInPassword?.fill(testData.password);

  const signInButton = await page.$('button[type="submit"]');
  await signInButton?.click();

  try {
    await page.waitForURL('**/decision-tree');
    console.log('Login with registered email passed');
  } catch (error) {
    console.error('Login with registered email failed');
  }
});

test('Login with unregistered email', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${config.BASE_URL}/login`);

  const signInEmail = await page.$('input[name="email"]');
  const signInPassword = await page.$('input[name="password"]');

  // TODO: Replace this with a test email and password
  await signInEmail?.fill('');
  await signInPassword?.fill('');

  const signInButton = await page.$('button[type="submit"]');
  await signInButton?.click();

  try {
    await page.waitForSelector(
      'text="You entered the wrong email or password."',
      { state: 'visible' }
    );
    console.log('Sign-in with unregistered email passed');
  } catch (error) {
    console.error('Sign-in with unregistered email failed');
  }
});

test('Login with registered email and incorrect password', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${config.BASE_URL}/login`);

  const signInEmail = await page.$('input[name="email"]');
  const signInPassword = await page.$('input[name="password"]');

  await signInEmail?.fill(testData.email);
  await signInPassword?.fill(testData.password + '1');

  const signInButton = await page.$('button[type="submit"]');
  await signInButton?.click();

  try {
    await page.waitForSelector(
      'text="You entered the wrong email or password."',
      { state: 'visible' }
    );
    console.log('Login with registered email and incorrect password passed');
  } catch (error) {
    console.error('Login with registered email and incorrect password failed');
  }
});
