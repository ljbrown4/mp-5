"use server";
import getCollection, {URL_COLLECTION} from '@/db';
import {URLProps} from "@/types";

export default async function getAllUrls(): Promise<URLProps[]> {
    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.find({favourites: true}).toArray(); //only collect the urls favourited

    const urls: URLProps[] = data.map((url) => ({
        url: url.url,
        alias: url.alias,
        shortened: url.shortened,
        title: url.title,
        favourites: url.favourites,
    }));
    return urls.reverse();
}