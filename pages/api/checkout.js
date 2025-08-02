// app/api/checkout/route.js
export async function POST(request) {
  try {
    const { lineItems } = await request.json();

    const domain = process.env.SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

    const query = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lineItems: lineItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    };

    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await res.json();
    const out = data.data.checkoutCreate;

    if (out.userErrors && out.userErrors.length > 0) {
      return Response.json(
        { error: out.userErrors[0].message },
        { status: 400 }
      );
    }
    if (!out.checkout?.webUrl) {
      return Response.json(
        { error: "No se pudo crear el checkout" },
        { status: 400 }
      );
    }
    return Response.json({ webUrl: out.checkout.webUrl }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
