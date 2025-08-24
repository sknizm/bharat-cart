import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectDB();
        const order = await Order.create(body);

        if (!order) return corsResponse(NextResponse.json({ error: "Failed to create order" }, { status: 401 }));

        const razorpay = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
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
                keyId: process.env.KEY_ID,
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