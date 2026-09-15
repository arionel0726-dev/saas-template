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

export function ResetPasswordEmail({ url }: { url: string }) {
	return (
		<Html>
			<Head />
			<Preview>Сброс пароля</Preview>
			<Body style={{ fontFamily: 'sans-serif' }}>
				<Container>
					<Heading>Сброс пароля</Heading>
					<Text>
						Мы получили запрос на сброс пароля для вашего аккаунта. Если это
						были не вы — просто проигнорируйте это письмо.
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
						Сбросить пароль
					</Button>
					<Text>Ссылка действительна в течение часа.</Text>
				</Container>
			</Body>
		</Html>
	)
}
