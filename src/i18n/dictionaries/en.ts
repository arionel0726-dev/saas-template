import type { Dictionary } from './ru'

const en: Dictionary = {
	'common.appName': 'app',
	'common.loading': 'Loading…',
	'common.save': 'Save',
	'common.cancel': 'Cancel',
	'nav.dashboard': 'Dashboard',
	'nav.pricing': 'Pricing',
	'nav.signOut': 'Sign out',
	'nav.signIn': 'Sign in',
	'nav.errors': 'Errors',
	'auth.login.title': 'Sign in',
	'auth.login.submit': 'Sign in',
	'auth.login.noAccount': 'No account?',
	'auth.login.hasAccount': 'Already have an account?',
	'auth.register.title': 'Create account',
	'auth.register.submit': 'Create account',
	'auth.email': 'Email',
	'auth.password': 'Password',
	'auth.name': 'Name',
	'auth.google': 'Continue with Google',
	'auth.or': 'or',
	'auth.error.generic': 'Something went wrong, please try again',
	'auth.login.forgotPassword': 'Forgot password?',
	'auth.forgotPassword.title': 'Reset password',
	'auth.forgotPassword.submit': 'Send reset link',
	'auth.forgotPassword.sent':
		'If that email is registered, a reset link has been sent to it',
	'auth.resetPassword.title': 'New password',
	'auth.resetPassword.newPassword': 'New password',
	'auth.resetPassword.submit': 'Save password',
	'auth.resetPassword.done': 'Password changed, you can sign in now',
	'auth.resetPassword.invalidLink': 'This link is invalid or has expired',
	'auth.verifyEmail.title': 'Verify email',
	'auth.verifyEmail.success': 'Email verified',
	'auth.verifyEmail.pending':
		'We sent a verification link to your email address',
	'auth.verifyEmail.error': 'This link is invalid or has expired',
	'auth.verifyEmail.resend': 'Resend email',
	'auth.verifyEmail.resent': 'Email sent again',
	'price.title': 'Pricing',
	'price.subtitle': 'Start free — upgrade when you need to',
	'price.perMonth': '/mo',
	'price.choose': 'Choose',
	'price.free.name': 'Free',
	'price.free.f1': '1 project',
	'price.free.f2': 'Basic analytics',
	'price.pro.name': 'Pro',
	'price.pro.f1': 'Unlimited projects',
	'price.pro.f2': 'Priority support',

	// en.ts — то же самое
	'billing.cancel': 'Cancel subscription',
	'billing.cancelConfirm':
		'Cancel subscription? Access remains until the end of the paid period.',
	'billing.cancelled': 'Subscription cancelled',
	'billing.history.title': 'Payment history',
	'billing.history.empty': 'No payments yet',
	'billing.history.receipt': 'Receipt',
	'account.delete': 'Delete account',
	'account.deleteConfirm':
		'Permanently delete your account? This cannot be undone.',
	'common.copy': 'Copy',
	'common.copied': 'Copied',
	'theme.toggle': 'Theme',
	'theme.light': 'Light',
	'theme.dark': 'Dark',
	'landing.faq.title': 'FAQ',

	'common.retry': 'Try again',
	'landing.testimonials.title': 'Testimonials',
	'landing.cta.title': 'Start now',
	'landing.cta.subtitle':
		'Free plan, no card required. Upgrade in a minute when you need to.',

	'lang.switch': 'Language',

	'admin.errors.title': 'Errors',
	'admin.errors.empty': 'No errors yet',
	'admin.errors.date': 'Date',
	'admin.errors.source': 'Source',
	'admin.errors.message': 'Message',

	// legal
	'nav.privacy': 'Privacy',
	'nav.terms': 'Terms of Service',

	'legal.privacy.title': 'Privacy Policy',
	'legal.privacy.intro':
		'This policy describes what data {appName} collects and how we use it. This is a template — replace it with text reviewed by your lawyer before going to production.',
	'legal.privacy.dataCollected.title': 'What data we collect',
	'legal.privacy.dataCollected.body':
		'Name and email on sign-up; sign-in data from Google if you use that method; technical usage data; payment data is handled by Lemon Squeezy — we never store card numbers.',
	'legal.privacy.dataUse.title': 'How we use your data',
	'legal.privacy.dataUse.body':
		'To run your account, send transactional emails (email confirmation, password reset, subscription notices), and to fix issues in the service.',
	'legal.privacy.sharing.title': 'Sharing with third parties',
	'legal.privacy.sharing.body':
		'We only share data with services required to run the app: Resend (email delivery), Lemon Squeezy (payments), Google (sign-in), and our database provider.',
	'legal.privacy.cookies.title': 'Cookies',
	'legal.privacy.cookies.body':
		'We use cookies to keep you signed in and to remember your chosen interface language — the service cannot work without them.',
	'legal.privacy.rights.title': 'Your rights',
	'legal.privacy.rights.body':
		'You can delete your account and all associated data at any time from the dashboard settings.',
	'legal.privacy.contact.title': 'Contact',
	'legal.privacy.contact.body':
		'For questions about this policy, email the support address shown in emails from {appName}.',

	'legal.terms.title': 'Terms of Service',
	'legal.terms.intro':
		'By using {appName} you agree to these terms. This is a template — replace it with text reviewed by your lawyer before going to production.',
	'legal.terms.account.title': 'Account',
	'legal.terms.account.body':
		'You are responsible for keeping your credentials safe and for all activity under your account.',
	'legal.terms.billing.title': 'Billing and subscriptions',
	'legal.terms.billing.body':
		'Paid plans are purchased and billed through Lemon Squeezy. You can cancel your subscription from the dashboard at any time; access remains until the end of the paid period.',
	'legal.terms.liability.title': 'Limitation of liability',
	'legal.terms.liability.body':
		'The service is provided "as is", without warranties of any kind. We are not liable for indirect damages arising from use of the service.',
	'legal.terms.termination.title': 'Termination',
	'legal.terms.termination.body':
		'You can delete your account at any time from the dashboard settings. We may restrict access if you violate these terms.',
	'legal.terms.changes.title': 'Changes to these terms',
	'legal.terms.changes.body':
		'We may update these terms from time to time. Continuing to use the service after a change means you accept the new version.',
	'legal.terms.contact.title': 'Contact',
	'legal.terms.contact.body':
		'For questions about these terms, email the support address shown in emails from {appName}.'
}

export default en
