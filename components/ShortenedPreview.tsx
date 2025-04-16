"use client";
import {useState } from "react";
import { URLProps } from "@/types";
import { Button, Checkbox, FormControl, FormHelperText } from "@mui/material";
import toggleFavourite from "@/lib/toggleFavourite";
import deleteAlias from "@/lib/deleteAlias"

export default function ShortenedPreview({ short }: { short: URLProps }) {
    const [favourite, setFavourite] = useState(short.favourites || false);
    const [deleted, setDeleted] = useState(false);

    const toggle = async () => { //looked up how to use server components in a client component
        const update = !favourite;
        setFavourite(update);
        await toggleFavourite(short.alias, update);
    };

    const handleDelete = async () => {
        await deleteAlias(short.alias);
        setDeleted(true);
    };

    return (
        <div className="bg-[#e0e1dd] rounded-xl p-4 m-3 w-[80%] shadow-md mx-auto">
            {short.title && (
                <h4 className="font-bold text-lg text-[#453750] mb-1">
                    {short.title}
                </h4>
            )}

            <div className="flex flex-row items-center justify-between flex-wrap">
                <p className="text-[#73648a] font-semibold underline w-full mb-1">
                    <a href={short.shortened} target="_blank">
                        {short.shortened}
                    </a>
                </p>

                <div className="flex items-center">
                    <Checkbox
                        checked={favourite}
                        color="secondary"
                        sx={{
                            color: "#3e5c3f",
                        }}
                        onChange={toggle}/>
                    <span className="text-sm">Favourite</span>
                </div>

                <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigator.clipboard.writeText(short.shortened)}
                >
                    Copy URL
                </Button>

                <FormControl className="mt-2">
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete Alias
                    </Button>
                    {deleted && (
                        <FormHelperText>Alias successfully deleted.</FormHelperText>
                    )}
                </FormControl>
            </div>
        </div>
    );
}