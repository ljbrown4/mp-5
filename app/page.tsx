"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ShortenedDisplay from "@/components/ShortenedDisplay";
import GetFavouriteUrls from "@/lib/getFavouriteUrls";
import theme from "@/theme";
import { ThemeProvider } from '@mui/material/styles';
import URLShortenerForm from "@/components/URLShortenerForm";
import {URLProps} from "@/types";

export default function Home() {

    const [urls, setUrls] = useState<URLProps[]>([]);

    // use fetch to incorporate server side components
    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const allUrls = await GetFavouriteUrls();
                setUrls(allUrls);
            } catch (error) {
                console.error("Failed to fetch URLs:", error);
            }
        };
        fetchUrls();
    }, []);

    return(
        <ThemeProvider theme={theme}>
            <main className="min-h-screen w-full flex-col justify-center text-black bg-[#c5c2c9]">
                <Header />
                <div className="p-auto flex flex-col md:flex-row justify-center items-center w-full">
                    {/*looked up how to make it change between flex row and col based on screen size*/}
                    <div className="w-[90%] m-auto md:w-[50%]">
                        <h1 className="font-bold text-4xl text-[#453750] text-center mt-4 p-2">URL SHORTENER</h1>
                        <p className="font-bold text-xl text-[#73648a] text-center mb-2 p-2">
                            Aliases can not be duplicated. Please delete old alias in the Saved URLs page. </p>
                        <URLShortenerForm append={() => {}} />
                    </div>
                    <div className="w-full m-auto pb-4 md:w-[45%]">
                        <h2 className="font-bold w-full text-2xl text-[#453750] mb-4 mt-6 text-center">
                            Favourited URLs
                        </h2>
                        <ShortenedDisplay inputShortened={urls} />
                    </div>
                </div>
            </main>
        </ThemeProvider>

    );
}