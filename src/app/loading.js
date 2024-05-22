import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
	return (
		<>
			<div className="flex w-full flex-1 flex-col justify-start gap-4 overflow-auto p-4 scrollbar">
				{Array.from({ length: 6 }, (_, i) => i + 1).map(i => (
					<Skeleton
						key={i}
						className="h-14"
					/>
				))}
			</div>
		</>
	)
}

export default Loading
