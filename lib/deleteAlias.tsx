"use server";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function deleteAlias(alias: string) {
    const collection = await getCollection(URL_COLLECTION);
    await collection.deleteOne({ alias });
}