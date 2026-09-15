const ru = {
	// common
	'common.appName': 'app',
	'common.loading': 'Загрузка…',
	'common.save': 'Сохранить',
	'common.cancel': 'Отмена',

	// nav
	'nav.dashboard': 'Панель',
	'nav.pricing': 'Тарифы',
	'nav.signOut': 'Выйти',
	'nav.signIn': 'Войти',
	'nav.errors': 'Ошибки',

	// auth
	'auth.login.title': 'Вход',
	'auth.login.submit': 'Войти',
	'auth.login.noAccount': 'Нет аккаунта?',
	'auth.login.hasAccount': 'Уже есть аккаунт?',
	'auth.register.title': 'Регистрация',
	'auth.register.submit': 'Создать аккаунт',
	'auth.email': 'Email',
	'auth.password': 'Пароль',
	'auth.name': 'Имя',
	'auth.google': 'Продолжить через Google',
	'auth.or': 'или',
	'auth.error.generic': 'Что-то пошло не так, попробуйте ещё раз',
	'auth.login.forgotPassword': 'Забыли пароль?',
	'auth.forgotPassword.title': 'Сброс пароля',
	'auth.forgotPassword.submit': 'Отправить ссылку',
	'auth.forgotPassword.sent':
		'Если такой email зарегистрирован — на него отправлена ссылка для сброса пароля',
	'auth.resetPassword.title': 'Новый пароль',
	'auth.resetPassword.newPassword': 'Новый пароль',
	'auth.resetPassword.submit': 'Сохранить пароль',
	'auth.resetPassword.done': 'Пароль изменён, теперь можно войти',
	'auth.resetPassword.invalidLink': 'Ссылка недействительна или устарела',
	'auth.verifyEmail.title': 'Подтверждение email',
	'auth.verifyEmail.success': 'Email подтверждён',
	'auth.verifyEmail.pending':
		'Мы отправили письмо со ссылкой для подтверждения на вашу почту',
	'auth.verifyEmail.error': 'Ссылка недействительна или устарела',
	'auth.verifyEmail.resend': 'Отправить письмо ещё раз',
	'auth.verifyEmail.resent': 'Письмо отправлено повторно',

	// price
	'price.title': 'Тарифы',
	'price.subtitle': 'Начните бесплатно — апгрейдитесь, когда понадобится',
	'price.perMonth': '/мес',
	'price.choose': 'Выбрать',
	'price.free.name': 'Free',
	'price.free.f1': '1 проект',
	'price.free.f2': 'Базовая аналитика',
	'price.pro.name': 'Pro',
	'price.pro.f1': 'Безлимит проектов',
	'price.pro.f2': 'Приоритетная поддержка',

	// ru.ts — добавить в объект
	'billing.cancel': 'Отменить подписку',
	'billing.cancelConfirm':
		'Отменить подписку? Доступ сохранится до конца оплаченного периода.',
	'billing.cancelled': 'Подписка отменена',
	'billing.history.title': 'История платежей',
	'billing.history.empty': 'Платежей пока нет',
	'billing.history.receipt': 'Чек',
	'account.delete': 'Удалить аккаунт',
	'account.deleteConfirm':
		'Удалить аккаунт безвозвратно? Это действие нельзя отменить.',
	'common.copy': 'Копировать',
	'common.copied': 'Скопировано',
	'theme.toggle': 'Тема',
	'theme.light': 'Светлая',
	'theme.dark': 'Тёмная',
	'landing.faq.title': 'Частые вопросы',

	'common.retry': 'Попробовать снова',
	'landing.testimonials.title': 'Отзывы',
	'landing.cta.title': 'Начните прямо сейчас',
	'landing.cta.subtitle':
		'Бесплатный тариф без карты. Апгрейд за минуту, когда понадобится.',

	// language
	'lang.switch': 'Язык',

	'admin.errors.title': 'Ошибки',
	'admin.errors.empty': 'Ошибок пока нет',
	'admin.errors.date': 'Дата',
	'admin.errors.source': 'Источник',
	'admin.errors.message': 'Сообщение',

	// legal
	'nav.privacy': 'Конфиденциальность',
	'nav.terms': 'Условия использования',

	'legal.privacy.title': 'Политика конфиденциальности',
	'legal.privacy.intro':
		'Эта политика описывает, какие данные собирает {appName} и как мы их используем. Это шаблон — перед запуском в продакшн замените его текстом, согласованным с вашим юристом.',
	'legal.privacy.dataCollected.title': 'Какие данные мы собираем',
	'legal.privacy.dataCollected.body':
		'Имя и email при регистрации; данные для входа через Google, если вы используете этот способ; технические данные использования сервиса; данные об оплате обрабатывает Lemon Squeezy — мы не храним номера карт.',
	'legal.privacy.dataUse.title': 'Как мы используем данные',
	'legal.privacy.dataUse.body':
		'Для работы аккаунта, отправки транзакционных писем (подтверждение email, сброс пароля, уведомления по подписке) и для устранения ошибок в работе сервиса.',
	'legal.privacy.sharing.title': 'Передача третьим лицам',
	'legal.privacy.sharing.body':
		'Мы передаём данные только сервисам, необходимым для работы приложения: Resend (отправка писем), Lemon Squeezy (оплата), Google (вход через аккаунт) и провайдеру базы данных.',
	'legal.privacy.cookies.title': 'Cookies',
	'legal.privacy.cookies.body':
		'Мы используем cookies для входа в аккаунт и запоминания выбранного языка интерфейса — без них сервис не сможет работать.',
	'legal.privacy.rights.title': 'Ваши права',
	'legal.privacy.rights.body':
		'Вы можете удалить аккаунт и все связанные данные в любой момент в настройках дашборда.',
	'legal.privacy.contact.title': 'Контакты',
	'legal.privacy.contact.body':
		'По вопросам об этой политике напишите на адрес поддержки, указанный в письмах от {appName}.',

	'legal.terms.title': 'Условия использования',
	'legal.terms.intro':
		'Используя {appName}, вы соглашаетесь с этими условиями. Это шаблон — перед запуском в продакшн замените его текстом, согласованным с вашим юристом.',
	'legal.terms.account.title': 'Аккаунт',
	'legal.terms.account.body':
		'Вы несёте ответственность за сохранность своих учётных данных и за все действия, совершённые под вашим аккаунтом.',
	'legal.terms.billing.title': 'Оплата и подписка',
	'legal.terms.billing.body':
		'Платные тарифы оформляются и оплачиваются через Lemon Squeezy. Отмена подписки доступна в дашборде в любой момент; доступ сохраняется до конца оплаченного периода.',
	'legal.terms.liability.title': 'Ограничение ответственности',
	'legal.terms.liability.body':
		'Сервис предоставляется «как есть», без каких-либо гарантий. Мы не несём ответственности за косвенные убытки, возникшие из-за использования сервиса.',
	'legal.terms.termination.title': 'Прекращение доступа',
	'legal.terms.termination.body':
		'Вы можете удалить аккаунт в любой момент в настройках дашборда. Мы можем ограничить доступ при нарушении этих условий.',
	'legal.terms.changes.title': 'Изменения условий',
	'legal.terms.changes.body':
		'Мы можем время от времени обновлять эти условия. Продолжая пользоваться сервисом после изменений, вы соглашаетесь с новой версией.',
	'legal.terms.contact.title': 'Контакты',
	'legal.terms.contact.body':
		'По вопросам об этих условиях напишите на адрес поддержки, указанный в письмах от {appName}.'
} as const

export type DictionaryKey = keyof typeof ru
export type Dictionary = Record<DictionaryKey, string>

export default ru
