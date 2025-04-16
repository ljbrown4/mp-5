"use client";
import { URLProps } from "@/types";
import {useEffect, useState} from "react";
import ShortenedPreview from "./ShortenedPreview";
import getUrlCount from "@/lib/getUrlCount";

export default function ShortenedDisplay({ inputShortened }: { inputShortened: URLProps[] }) {
    const urls = inputShortened;
    const [urlCount, setUrlCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            const count = await getUrlCount();
            setUrlCount(count);
        };
        fetchCount();
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-semibold mb-4">Total Saved URLs: {urlCount}</h2>
            {urls.map((u) => (
                <ShortenedPreview key={u.alias} short={u} />
            ))}
        </div>
    );
}