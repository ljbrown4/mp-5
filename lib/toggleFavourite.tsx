"use server";

import getCollection, { URL_COLLECTION } from "@/db";

export default async function toggleFavourite(alias: string, favourites: boolean) {
    const urlCollection = await getCollection(URL_COLLECTION);
    await urlCollection.updateOne(
        {alias},
        {$set: {favourites: favourites}}
    );
}