export async function startRazorPayCheckout({ keyId,
    razorPayOrderId,
    amount,
    storeName,
    currency,
    slug }
    :
    {
        keyId: string,
        razorPayOrderId: string,
        amount: number,
        storeName: string,
        currency: string,
        slug: string
    }) {

    const loaded = await loadRazorpayScript();
    if (!loaded) {
        alert("Failed to load Razorpay SDK. Please check your connection.");
        return;
    }

    const options = {
        key: keyId,
        order_id: razorPayOrderId,
        amount: amount,
        currency: currency,
        name: storeName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
            // 3. Verify payment
           const res =  await fetch(`/api/store/${slug}/order/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...response, razorPayOrderId: razorPayOrderId }),
            });
            const data = await res.json();
            console.log("RAZOR RES", data)
        },
    };
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
}


export const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
        if (document.getElementById("razorpay-sdk")) {
            resolve(true); // already loaded
            return;
        }

        const script = document.createElement("script");
        script.id = "razorpay-sdk";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};