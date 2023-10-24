import Link from "next/link"

const Header = () => {
	return (
		<div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
			<ul className="flex">
				<li>
					<Link href="/">
						<strong>TIMELINER</strong>
					</Link>
				</li>
			</ul>
			<ul className="flex">
				<Link href="/signup">SignUp</Link>
			</ul>
		</div>
	)
}

export default Header
