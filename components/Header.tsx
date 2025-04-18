import Link from "next/link";

export default function Header() {
    const linkStyling = "md:p-1 mb-2 md:m-2 text-lg md:text-xl font-bold hover:underline text-[#4c7157]";
    const headerStyle = "w-full flex flex-wrap justify-between items-center p-3 text-[#618f63] bg-[whitesmoke]";

    return (
        <header className={headerStyle}>
            <div className="flex flex-col items-start mb-4 md:mb-0">
                <h2 className="text-2xl md:text-4xl font-semibold">CS-391 URL SHORTENER</h2>
                <p className="text-sm md:text-base font-bold">
                    shorten long urls into easy to understand and user-friendly aliases
                </p>
            </div>
            <nav className="flex flex-wrap space-x-4">
                <Link href="/" className={linkStyling}>
                    Home
                </Link>
                <Link href="/saved-urls" className={linkStyling}>
                    Saved URLs
                </Link>
            </nav>
        </header>
    );
}
