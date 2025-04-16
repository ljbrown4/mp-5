"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { redirect } from "next/navigation";

export default async function AliasPage({ params }: { params: { alias: string } }) {
    const urlCollection = await getCollection(URL_COLLECTION);

    const original = await urlCollection.findOne({ alias: params.alias });

    if (!original) {
        console.error("Alias not found.");
        return redirect("/");
    }

    console.log("Original URL found:", original);
    return redirect(original.url);
}