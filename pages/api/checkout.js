export async function POST(req) {
  try {
    const { items } = await req.json();

    // Shopify GraphQL Mutation
    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          userErrors { field message }
        }
      }
    `;

    // Adaptar items: variantId y quantity (Shopify espera así)
    const lineItems = items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

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
          query: mutation,
          variables: {
            input: { lineItems },
          },
        }),
      }
    );

    const data = await shopifyRes.json();
    const checkout = data.data?.checkoutCreate?.checkout;
    const userErrors = data.data?.checkoutCreate?.userErrors;

    if (checkout?.webUrl) {
      return Response.json({ webUrl: checkout.webUrl });
    } else {
      return Response.json(
        { error: userErrors?.[0]?.message || "No se pudo crear el checkout" },
        { status: 400 }
      );
    }
  } catch (e) {
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
