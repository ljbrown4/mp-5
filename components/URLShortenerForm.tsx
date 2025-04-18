import { URLProps } from "@/types";
//import {Textarea} from "@mui/joy";
import {Button, FormHelperText, TextField, Checkbox} from "@mui/material";
import {useState} from "react";
import shortenURL from "@/lib/ShortenURL";


export default function URLShortenerForm({ append }: { append: (newURL: URLProps) => void; }){


    //use useState to initiate and update each part of URLProps
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortened, setShortened] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [favourite, setFavourite] = useState(false);
    //errors: invalid url, already used alias
    const [error, setError] = useState<{ url: string | null, alias: string | null }>({
        url: null,
        alias: null,
    });


    return (
        <form
            className="min-w-full rounded-xl p-4 bg-[#e0e1dd]"
            onSubmit={async (e) => {
                e.preventDefault();
                //reset it so previous error messages don't show
                setError({ url: null, alias: null });


                const current = window.location.origin; //dynamically set url
                const error = await shortenURL(url, alias, title, favourite, current);
                const short = `${current}/${alias}`;

                if (error === null) {
                    const newUrl: URLProps = {
                        url,
                        alias,
                        shortened: short,
                        title,
                        favourites: favourite,
                    };
                    setShortened(short);
                    setUrl("");
                    setAlias("");
                    setTitle("");
                    setFavourite(false);

                    append(newUrl);
                } else {
                    setShortened(null);
                    if (error === "invalURL") {
                        setError({ url: "The entered url is invalid. Please enter a valid url.", alias: null });
                        setUrl("");
                        setAlias("");
                        setTitle("");
                        setFavourite(false);
                    } else if (error === "invalURL2") {
                        setError({ url: "The entered url creates a cycle. Cycles are not allowed.", alias: null });
                        setUrl("");
                        setAlias("");
                        setTitle("");
                        setFavourite(false);
                    } else if (error === "alias1") {
                        setError({url: null, alias: "Alias already exists. Please delete saved url or choose a different alias."})
                        setAlias("");
                        setTitle("");
                        setFavourite(false);
                    } else if (error === "alias2") {
                        setError({url: null, alias: "Alias includes invalid url characters. Please input a new alias"})
                        setAlias("");
                        setTitle("");
                        setFavourite(false);
                    } else {
                        setError({ url: null, alias: "An unexpected error occurred. Please try again." });
                    }}}}>


            {/* url label/input */}


            <h3 className="font-bold text-xl text-[#73648a] p-1">enter url:</h3>
            <TextField
                variant = "outlined"
                color = "primary"
                size="small"
                required = {true}
                sx={{backgroundColor: "whitesmoke", width:"100%"}}
                placeholder = "https://example-url.com/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />



            {/* alias label/input */}
            <h3 className="font-bold text-xl text-[#73648a] p-1 mt-4">enter custom alias:</h3>
            <div className = "w-full flex flex-wrap mx-2 items-center ">
                <span className="flex font-bold text-l text-[#707075] mr-4"> https://mp-5-theta-smoky.vercel.app/</span>
                <TextField
                    variant = "outlined"
                    color = "primary"
                    size="small"
                    required = {true}
                    sx = {{backgroundColor: "whitesmoke", width:"53%"}}
                    placeholder = "your-customized-alias"
                    value = {alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
            </div>




            {/* title label/input */}
            <h3 className="font-bold text-xl text-[#73648a] p-1 mt-2"> (optional) enter title:</h3>
            <TextField
                variant = "outlined"
                size="small"
                placeholder ="saved-url title"
                sx = {{backgroundColor: "whitesmoke", width: "100%",}}
                color = "primary"
                value = {title}
                onChange={(e) => setTitle(e.target.value)}/>






            {/* favourites */}
            <div className = "text-xl text-[#73648a] p-1 mb-1">
                <label className = "font-bold text-lg">Add to Favorites</label>
                <Checkbox
                    checked={favourite}
                    color = "secondary"
                    sx = {{
                        color: "#3e5c3f",
                    }}
                    onChange={() => setFavourite(!favourite)}/>
            </div>






            {/* submit button */}
            <div className="w-full h-10px flex justify-center p-2">
                <Button type="submit" variant="contained"
                        sx={{
                            width: "80%",
                            backgroundColor: "#b6cfb8",
                            color: "#3e5c3f",
                            fontWeight: "bold",}}>
                    Shorten URL
                </Button>
            </div>


            {/* error message */}
            {(error.url || error.alias) && (
                <div className="w-full flex justify-center p-2">
                    <FormHelperText sx={{ color: "#95514c", fontWeight: "bold",fontSize: "calc(2px + 0.9vw)", "@media (max-width: 1000px)": { fontSize: "calc(8px + 0.9vw)" },}}>
                        {error.url || error.alias}
                    </FormHelperText>
                </div>
            )}


            {/* outputted shortened url */}
            {shortened && (
                <div className="w-full h-20px flex flex-row items-center justify-between flex-wrap p-2 mr-6">
                    <h2> Your Shortened url: </h2>
                    <FormHelperText sx={{ color: "#618753", fontWeight: "bold", fontSize: "calc(2px + 0.9vw)", "@media (max-width: 1000px)": { fontSize: "calc(8px + 0.9vw)" },}}>
                        <a href={shortened} target="_blank">{shortened}</a>
                    </FormHelperText>


                    <Button variant="contained" size="small" onClick={() => navigator.clipboard.writeText(shortened)}>
                        Copy URL
                    </Button>
                </div>
            )}
        </form>
    )
}