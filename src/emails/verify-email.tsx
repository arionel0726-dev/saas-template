import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Text
} from '@react-email/components'

export function VerifyEmailEmail({ url }: { url: string }) {
	return (
		<Html>
			<Head />
			<Preview>Подтвердите email</Preview>
			<Body style={{ fontFamily: 'sans-serif' }}>
				<Container>
					<Heading>Подтвердите свой email</Heading>
					<Text>
						Осталось подтвердить адрес почты, чтобы войти в аккаунт. Если вы не
						регистрировались — проигнорируйте это письмо.
					</Text>
					<Button
						href={url}
						style={{
							background: '#000',
							color: '#fff',
							padding: '12px 20px',
							borderRadius: 6
						}}
					>
						Подтвердить email
					</Button>
					<Text>Ссылка действительна в течение часа.</Text>
				</Container>
			</Body>
		</Html>
	)
}
