import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { corsResponse } from "@/lib/cors";

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, razorPayOrderId } =
            await req.json();
            
        console.log("razorPayOrderId ", razorPayOrderId)
        await connectDB();

        // const store = await getStoreBySlug(params.slug);
        // if (!store?.razorpayKeySecret) {
        //   return NextResponse.json({ error: "Razorpay not configured" }, { status: 400 });
        // }

        // Create expected signature
        const order = await Order.findOne({ razorPayOrderId: razorPayOrderId });
        console.log("order id ", order.razorPayOrderId)
        console.log("razorPayOrderId ", razorPayOrderId)
        if (!order) return corsResponse(NextResponse.json({ error: "Order not found" }, { status: 404 }));

        //  here user key 
        const expected = crypto
            .createHmac("sha256", "ClI7bd7PBcjjVQyW4Hfs7hbE")
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expected === razorpay_signature) {
            // ✅ Payment valid
            await Order.findOneAndUpdate({ razorPayOrderId: razorPayOrderId }, {
                paymentStatus: "paid",
                razorpayPaymentId: razorpay_payment_id,
            });
            return corsResponse(NextResponse.json({ success: true }));
        } else {
            // ❌ Invalid signature
            await Order.findOneAndUpdate({ razorPayOrderId: razorPayOrderId }, {
                paymentStatus: "failed",
            });
            return corsResponse(NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 }));
        }
    } catch (error) {
        console.log(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }));

    }
}