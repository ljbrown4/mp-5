import getCollection, { URL_COLLECTION } from "@/db";
import { redirect } from "next/navigation";

export default async function AliasPage({params,}: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const urlCollection = await getCollection(URL_COLLECTION);
    const original = await urlCollection.findOne({ alias });

    if (!original) {
        console.error("Alias not found.");
        return redirect("/");
    }

    return redirect(original.url);
}