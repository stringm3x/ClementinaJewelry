export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { lineItems } = req.body;

  const query = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          userErrors {
            message
          }
        }
      }
    `;

  const shopifyRes = await fetch(
    `https://${process.env.SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: {
          input: { lineItems },
        },
      }),
    }
  );

  const data = await shopifyRes.json();
  res.status(200).json(data.data.checkoutCreate);
}
