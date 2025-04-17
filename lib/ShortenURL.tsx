"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { URLProps } from "@/types";


export default async function shortenURL(url: string, alias: string, title:string, favourites: boolean): Promise<URLProps> {
    const urlCollection = await getCollection(URL_COLLECTION);

    //check if url is valid
    try { //added it in cases that fetch couldn't parse the url
        const validate = await fetch(url);
        if (!validate.ok) {
            throw new Error("invalURL");
        }
    } catch {
        throw new Error("invalURL");
    }

    //check if alias is already used
    const existingAlias = await urlCollection.findOne({alias});
    if (existingAlias) {
        throw new Error("alias1");
    //} else if () { how do u check this?
      //  throw new Error("alias2"); }
     }
    const short = `http://localhost:3000/${alias}`;

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
