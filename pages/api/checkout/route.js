// app/api/checkout/route.js

export async function POST(req) {
  try {
    // 1. Lee el body y revisa qué llega
    const body = await req.json();
    console.log("BODY RECIBIDO EN CHECKOUT:", body);

    const lineItems = body.lineItems || body.items || [];
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      console.error("No hay productos en el carrito");
      return Response.json(
        { error: "No hay productos en el carrito" },
        { status: 400 }
      );
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

    // 4. Asegúrate que Shopify responde algo
    const text = await res.text();
    console.log("RESPUESTA DE SHOPIFY RAW:", text);

    let shopifyData;
    try {
      shopifyData = JSON.parse(text);
    } catch (err) {
      console.error("No se pudo parsear el JSON:", err);
      return Response.json(
        { error: "Respuesta inválida de Shopify" },
        { status: 500 }
      );
    }

    // 5. Si hay error, responde
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
    // ¡Nunca devuelvas una respuesta vacía!
    console.error("CATCH ERROR EN CHECKOUT:", err);
    return Response.json(
      { error: err.message || "Ocurrió un error en el servidor" },
      { status: 500 }
    );
  }
}
