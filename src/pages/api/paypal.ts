import { NextApiRequest, NextApiResponse } from "next";
import getToken from "./get-token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      const accessToken = await getToken();

      const paypalResponse = await fetch(
        "https://api.paypal.com/v2/checkout/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount.toString(),
                },
              },
            ],
          }),
        }
      );

      if (!paypalResponse.ok) {
        throw new Error(`PayPal API error: ${paypalResponse.statusText}`);
      }

      const data = await paypalResponse.json();
      const { id: orderId } = data;

      res.status(200).json({ success: true, orderId });
    } catch (error) {
      console.error("PayPal API error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
