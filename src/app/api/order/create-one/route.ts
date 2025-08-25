import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import Store from "@/models/Store";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectDB(); 

        const store = await Store.findOne({_id:body.store});
        if(!store) return corsResponse(NextResponse.json({error:"Store not found"},{status:404}));

        const order = await Order.create(body);

        if (!order) return corsResponse(NextResponse.json({ error: "Failed to create order" }, { status: 401 }));

        const razorpay = new Razorpay({
            key_id: store.razorpayKeyId,
            key_secret: store.razorpayKeySecret
        });

        const razorPayOrder = await razorpay.orders.create({
            amount: order.amount * 100,
            currency: "INR",
            receipt: `${order._id}`,
            payment_capture: true,
        });

        order.razorPayOrderId = razorPayOrder.id;
        await order.save();

        return corsResponse(NextResponse.json({
            order: order._id,
            razorpay: {
                keyId: store.razorpayKeyId,
                razorPayOrderId: razorPayOrder.id,
                amount: razorPayOrder.amount,
                currency: razorPayOrder.currency,
            },
        }, { status: 201 }));

    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }

}