// app/api/checkout/route.js
export async function POST(req) {
  try {
    const { lineItems } = await req.json();

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return Response.json(
        { error: "No hay productos en el carrito" },
        { status: 400 }
      );
    }

    const mutation = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors { message }
        }
      }
    `;

    const res = await fetch(
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
            input: {
              lines: lineItems.map((item) => ({
                merchandiseId: item.variantId,
                quantity: item.quantity,
              })),
            },
          },
        }),
      }
    );

    const text = await res.text();
    // Opcional: console.log("Shopify checkout raw:", text);
    const shopifyData = JSON.parse(text);

    if (
      shopifyData.errors ||
      shopifyData.data?.cartCreate?.userErrors?.length
    ) {
      const message =
        shopifyData.errors?.[0]?.message ||
        shopifyData.data.cartCreate.userErrors?.[0]?.message ||
        "Error desconocido de Shopify";
      return Response.json({ error: message }, { status: 400 });
    }

    const url = shopifyData.data?.cartCreate?.cart?.checkoutUrl;
    if (!url) {
      return Response.json(
        { error: "No se obtuvo el checkoutUrl de Shopify" },
        { status: 500 }
      );
    }

    return Response.json({ checkoutUrl: url });
  } catch (err) {
    return Response.json(
      { error: err.message || "Ocurrió un error en el servidor" },
      { status: 500 }
    );
  }
}
