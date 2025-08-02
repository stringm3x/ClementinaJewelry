export async function POST(req) {
  try {
    const { lineItems } = await req.json();

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

    const res = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            lines: lineItems.map(item => ({
              merchandiseId: item.variantId,
              quantity: item.quantity,
            })),
          },
        },
      }),
    });

    const { data, errors } = await res.json();

    if (errors || data.cartCreate.userErrors.length) {
      return Response.json({ error: (errors && errors[0]?.message) || data.cartCreate.userErrors[0]?.message }, { status: 400 });
    }

    return Response.json({
      checkoutUrl: data.cartCreate.cart.checkoutUrl,
    });
  } catch (err) {
    return Response.json({ error: err.message || "Ocurrió un error" }, { status: 500 });
  }
}
