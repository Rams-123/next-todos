import Link from "next/link"
import { ThemeToggler } from "./ThemeToggler"

const Navbar = () => {
	return (
		<div className="flex items-center justify-between p-4 backdrop-blur-md">
			<Link href="/">Todo App</Link>
			<ThemeToggler />
		</div>
	)
}

export default Navbar
