import { connectDB } from "@/lib/mongoose";
import Store from "@/models/Store";
import { NextResponse } from "next/server";


const VERCEL_TOKEN = process.env.VERCEL_TOKEN; // create in Vercel settings
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID; // get from Vercel project dashboard

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        await connectDB();
        if (!body.domain) return NextResponse.json({ error: "Domain not found" }, { status: 404 });


        // check if domain is already there or not 
        const existingStore = await Store.findById(body._id, { domain: 1 });

        if (existingStore?.domain && existingStore.domain === body.domain) {
            const res = await fetch(
                `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${body.domain}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${VERCEL_TOKEN}`,
                    },
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.error("Vercel API error:", data);
                return NextResponse.json(
                    { error: "Failed to add domain", details: data },
                    { status: 500 }
                );
            }

        }

        const result = await Store.updateOne({
            _id: body._id
        }, {
            $set: body
        });

        if (result.matchedCount === 0) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        let dnsInstructions = null;


        // If domain provided, call Vercel API
        if (body.domain) {
            const res = await fetch(
                `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${VERCEL_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: body.domain }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.error("Vercel API error:", data);
                return NextResponse.json(
                    { error: "Failed to add domain", details: data },
                    { status: 500 }
                );
            }

            // Pass DNS verification instructions back to frontend
            if (data.verification && data.verification.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dnsInstructions = data.verification.map((v: any) => ({
                    type: v.type,
                    domain: v.domain,
                    value: v.value,
                }));
            }
        }

        return NextResponse.json(
            { success: true, dnsInstructions },
            { status: 201 }
        );




    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}