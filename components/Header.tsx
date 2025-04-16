import Link from "next/link";

export default function Header() {
    const linkStyling = "p-1 m-2 text-xl font-bold hover:underline";
    const headerStyle = "w-full flex justify-between items-center h-25 text-[#618f63] bg-[whitesmoke]";
    return (
        <header className={headerStyle}>
            <div className="flex-col items-center justify-between ">
                <h2 className = "text-4xl font-semibold p-1 ml-2 mb-1"> CS-391 URL SHORTENER </h2>
                <p className="ml-2 font-bold"> "shorten long urls into easy to understand and user-friendly aliases"</p>
            </div>
            <nav className = "p-2 m-4 flex">
                <Link href="/" className = {linkStyling}>
                    Home
                </Link>
                <Link href="/saved-urls" className = {linkStyling}>
                    Saved URLs
                </Link>
            </nav>
        </header>
    );
}