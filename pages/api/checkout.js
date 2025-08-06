// pages/api/checkout.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { lineItems } = req.body;
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    }

    const mutation = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { id checkoutUrl }
          userErrors { message }
        }
      }
    `;

    const response = await fetch(
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

    const data = await response.json();

    if (data.errors || data.data?.cartCreate?.userErrors?.length) {
      const msg =
        data.errors?.[0]?.message ||
        data.data.cartCreate.userErrors?.[0]?.message ||
        "Error desconocido de Shopify";
      return res.status(400).json({ error: msg });
    }

    const url = data.data.cartCreate.cart.checkoutUrl;
    if (!url) {
      return res
        .status(500)
        .json({ error: "No se obtuvo el checkoutUrl de Shopify" });
    }
    return res.status(200).json({ checkoutUrl: url });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Ocurrió un error en el servidor" });
  }
}
