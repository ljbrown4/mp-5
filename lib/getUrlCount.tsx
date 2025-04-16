"use server";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function getUrlCount(): Promise<number> {
    const col = await getCollection(URL_COLLECTION);
    return await col.countDocuments();
}