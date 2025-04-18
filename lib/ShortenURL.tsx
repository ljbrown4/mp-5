"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { URLProps } from "@/types";


export default async function shortenURL(url: string, alias: string, title:string, favourites: boolean, current: string): Promise<string | null> {
    const urlCollection = await getCollection(URL_COLLECTION);

    if (url.startsWith("https://mp-5-theta-smoky.vercel.app") || url.startsWith("http://localhost:3000")) {
        return "invalURL2";
    }

    //check if url is valid
    try { //added it in cases that fetch couldn't parse the url
        const validate = await fetch(url);
        if (validate.status < 200 || validate.status >= 500) {
            console.log("InvalURL", url);
            return "invalURL";
        }
    } catch {
        console.log("invalURL", url);
        return "invalURL";
    }

    //check if alias is already used
    const existingAlias = await urlCollection.findOne({alias});

    if (existingAlias) {
        console.log("alias2", alias);
        return "alias1";
     }
    if (!/^[a-zA-Z0-9_-]+$/.test(alias)) { //looked up how to check for entered invalid url characters
        console.log("alias2", alias);
        return "alias2";
    }

    const short = `${current}/${alias}`;

    const newUrl: URLProps = {
        url,
        alias,
        shortened: short,
        title,
        favourites,
    };

    await urlCollection.insertOne({...newUrl});

    return null;
}
