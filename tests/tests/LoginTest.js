import {ClientFunction} from 'testcafe';
import LoginPage from "../pageobjects/LoginPage";

const loginPageUrl = `https://login-test.plista.com/de/`
const getCurrentUrl = ClientFunction(() => window.location.href);

fixture('User Login Test').page(loginPageUrl);

test('Verify plista logo and language toggle functionality', async t => {
    await t
        .expect(getCurrentUrl()).contains(loginPageUrl)
        .expect(LoginPage.plistLogo.exists).ok();
    await LoginPage.clickOnSwitchLanguageToggle();
    await t
        .expect(LoginPage.createAccountLink.innerText)
        .eql('Hier registrieren', 'Title is not in German');
});

test('User should be login with valid credentials', async t => {
    await LoginPage.selectCountryName('India');
    await LoginPage.enterUserEmail('testuser@gmail.com');
    await LoginPage.enterUserPassword('plista123%A');
    await LoginPage.clickOnLoginButton();
});

test('Verify resend verification link for account not verified', async t => {
    await LoginPage.enterUserEmail('testuser@gmail.com');
    await LoginPage.enterUserPassword('plista123%A');
    await LoginPage.clickOnLoginButton();
    await LoginPage.clickOnResendVerificationLink();
    await t
        .expect(LoginPage.mailSentText.innerText)
        .eql('Activation Mail resent.', 'Mail resent is not present');
    await LoginPage.clickOnGoToLoginPageButton();
});
