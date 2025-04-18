"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { URLProps } from "@/types";


export default async function shortenURL(url: string, alias: string, title:string, favourites: boolean, current: string): Promise<URLProps> {
    const urlCollection = await getCollection(URL_COLLECTION);

    //check if url is valid
    try { //added it in cases that fetch couldn't parse the url
        const validate = await fetch(url);
        if (!validate.ok) {
            console.error("InvalURL", url);
            throw new Error("invalURL");
        }
    } catch {
        console.error("invalURL", url);
        throw new Error("invalURL");
    }

    //check if alias is already used
    const existingAlias = await urlCollection.findOne({alias});

    if (existingAlias) {
        console.error("alias2", alias);
        throw new Error("alias1");
     }
    if (!/^[a-zA-Z0-9_-]+$/.test(alias)) { //looked up how to check for entered invalid url characters
        console.error("alias2", alias);
        throw new Error("alias2");
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

    return newUrl;
}
