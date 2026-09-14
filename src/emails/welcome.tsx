import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Text
} from '@react-email/components'

export function WelcomeEmail({ name }: { name: string }) {
	return (
		<Html>
			<Head />
			<Preview>Добро пожаловать</Preview>
			<Body style={{ fontFamily: 'sans-serif' }}>
				<Container>
					<Heading>Привет, {name}!</Heading>
					<Text>
						Аккаунт создан. Если это были не вы — просто проигнорируйте письмо.
					</Text>
				</Container>
			</Body>
		</Html>
	)
}
