export function LegalPage({
	title,
	intro,
	sections
}: {
	title: string
	intro: string
	sections: { title: string; body: string }[]
}) {
	return (
		<div className="min-h-dvh py-10 sm:py-16 px-4">
			<div className="max-w-2xl mx-auto grid gap-8">
				<div>
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
						{title}
					</h1>
					<p className="text-muted-foreground mt-3">{intro}</p>
				</div>
				{sections.map(s => (
					<section key={s.title} className="grid gap-2">
						<h2 className="text-xl font-semibold">{s.title}</h2>
						<p className="text-muted-foreground">{s.body}</p>
					</section>
				))}
			</div>
		</div>
	)
}
