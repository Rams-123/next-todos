import React from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const Loading = () => {
	const cards = Array.from({ length: 6 }, (_, i) => i + 1)

	return (
		<div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{cards.map(card => (
				<Card
					key={card}
					className="h-fit flex-col backdrop-blur-sm"
				>
					<CardHeader className="flex w-full flex-col items-center gap-2">
						<div className="w-full">
							<Skeleton className="h-16 w-full" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="w-full">
							<Skeleton className="h-8 w-full" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

export default Loading
