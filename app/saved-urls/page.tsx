"use client";
import { URLProps } from "@/types";
import { useState, useEffect } from "react";
import ShortenedDisplay from "@/components/ShortenedDisplay";
import GetAllUrls from "@/lib/GetAllUrls";
import Header from "@/components/Header";
import theme from "@/theme";
import { ThemeProvider } from '@mui/material/styles';

export default function SavedUrls() {

    const [urls, setUrls] = useState<URLProps[]>([]);

    // use fetch to incorporate server side components
    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const allUrls = await GetAllUrls();
                setUrls(allUrls);
            } catch (error) {
                console.error("Failed to fetch URLs:", error);
            }
        };

        fetchUrls();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <main className="min-h-screen w-full flex-col items-center text-black bg-[#c5c2c9]">
                <Header />
                <div className="mt-8 pb-4 w-full flex-col justify-center items-center m-auto">
                    <h1 className="font-bold text-4xl text-[#453750] text-center mt-4 mb-2 p-2">All Saved Urls and Aliases</h1>
                        <ShortenedDisplay inputShortened={urls} />
                </div>
            </main>
        </ThemeProvider>
    );
}
