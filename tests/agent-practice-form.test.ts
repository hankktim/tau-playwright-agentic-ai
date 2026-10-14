import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/LoginPage';
import { RegistrationPage } from '../page_objects/RegistrationPage';

test.describe('Practice Form Required-Choice Validation', () => {
  test('Reject valid names when Gender and Programming language are both unselected', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);
    const genderError = page.getByText('Gender is a required field', { exact: true });
    const programmingLanguageError = page.getByText('Programming Language is a required field', { exact: true });

    // 1. Start from a fresh browser session with no authenticated user or populated form state.
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Sign in with the demo credentials and verify the signed-in homepage opens.
    await loginPage.login('Success', 'Success3400');
    await expect(page.getByRole('heading', { name: 'Home Page' })).toBeVisible();

    // 3. Open Practice Form and verify the blank form is displayed.
    await registrationPage.clickPracticeForm();
    await expect(registrationPage.pageHeading).toBeVisible();
    await expect(page).toHaveURL(/\/practice-form$/);
    await expect(registrationPage.firstNameField).toHaveValue('');
    await expect(registrationPage.lastNameField).toHaveValue('');

    // 4. Verify no required-choice option is selected and no validation errors are present.
    for (const gender of ['Male', 'Female', 'Other']) {
      await expect(page.getByLabel(gender, { exact: true })).not.toBeChecked();
    }
    for (const language of ['Java', 'Python', 'JavaScript', 'TypeScript', 'C#']) {
      await expect(page.getByLabel(language, { exact: true })).not.toBeChecked();
    }
    await expect(genderError).not.toBeVisible();
    await expect(programmingLanguageError).not.toBeVisible();

    // 5. Enter valid first and last names and verify their values.
    await registrationPage.setFirstName('Jane');
    await registrationPage.setLastName('Doe');
    await expect(registrationPage.firstNameField).toHaveValue('Jane');
    await expect(registrationPage.lastNameField).toHaveValue('Doe');

    // 6. Submit without selecting Gender or Programming language and verify submission is blocked.
    await registrationPage.clickSubmitButton();
    await expect(genderError).toBeVisible();
    await expect(programmingLanguageError).toBeVisible();
    await expect(registrationPage.firstNameField).toHaveValue('Jane');
    await expect(registrationPage.lastNameField).toHaveValue('Doe');
    await expect(registrationPage.confirmationDialog).not.toBeVisible();
    await expect(registrationPage.pageHeading).toBeVisible();
  });
});
