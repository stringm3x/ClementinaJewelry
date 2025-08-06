export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const body = req.body;
    const lineItems = body.lineItems || body.items || [];
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    }

    // --- MUTACIÓN checkoutCreate ---
    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          userErrors { message }
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
          query: mutation,
          variables: {
            input: {
              lineItems: lineItems.map((item) => ({
                variantId: item.variantId,
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

    // Errores de Shopify
    if (
      shopifyData.errors ||
      shopifyData.data?.checkoutCreate?.userErrors?.length
    ) {
      const message =
        shopifyData.errors?.[0]?.message ||
        shopifyData.data.checkoutCreate.userErrors?.[0]?.message ||
        "Error desconocido de Shopify";
      return res.status(400).json({ error: message });
    }

    // URL de checkout
    let url = shopifyData.data?.checkoutCreate?.checkout?.webUrl;
    if (!url) {
      return res
        .status(500)
        .json({ error: "No se obtuvo el checkoutUrl de Shopify" });
    }

    // (opcional) Forzar dominio myshopify.com si quieres:
    // try {
    //   const parsed = new URL(url);
    //   parsed.hostname = "dkdy49-tw.myshopify.com"; // <-- reemplaza por el tuyo si quieres
    //   url = parsed.toString();
    // } catch (e) {}

    return res.status(200).json({ checkoutUrl: url });
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Ocurrió un error en el servidor",
    });
  }
}
