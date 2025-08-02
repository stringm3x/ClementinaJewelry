// pages/api/checkout.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // 1. Lee el body
    const body = req.body;
    // Si usas Next.js 13/14, quizá necesites:
    // const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const lineItems = body.lineItems || body.items || [];
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    }

    // 2. Prepara la mutación
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

    // 3. Haz el fetch a Shopify
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

    const text = await shopifyRes.text();
    let shopifyData;
    try {
      shopifyData = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ error: "Respuesta inválida de Shopify" });
    }

    if (
      shopifyData.errors ||
      shopifyData.data?.cartCreate?.userErrors?.length
    ) {
      const message =
        shopifyData.errors?.[0]?.message ||
        shopifyData.data.cartCreate.userErrors?.[0]?.message ||
        "Error desconocido de Shopify";
      return res.status(400).json({ error: message });
    }

    const url = shopifyData.data?.cartCreate?.cart?.checkoutUrl;
    if (!url) {
      return res
        .status(500)
        .json({ error: "No se obtuvo el checkoutUrl de Shopify" });
    }

    return res.status(200).json({ checkoutUrl: url });
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Ocurrió un error en el servidor",
    });
  }
}
