const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID ?? "";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? "";
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

const PREMIUM_PRICE = "9.00";
const PREMIUM_CURRENCY = "USD";

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`);
  }

  const data = await res.json() as { access_token: string };
  return data.access_token;
}

export async function createOrder(): Promise<{ orderId: string; approvalUrl: string }> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: PREMIUM_CURRENCY,
            value: PREMIUM_PRICE,
          },
          description: "Biolink Premium — Lifetime Access",
        },
      ],
      application_context: {
        brand_name: "Biolink",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`PayPal create order failed: ${res.status}`);
  }

  const data = await res.json() as {
    id: string;
    links: Array<{ rel: string; href: string }>;
  };

  const approvalUrl = data.links.find((l) => l.rel === "approve")?.href ?? "";
  return { orderId: data.id, approvalUrl };
}

export async function captureOrder(orderId: string): Promise<boolean> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}
