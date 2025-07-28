export async function getAllProducts() {
  const domain = process.env.SHOPIFY_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

  const query = `
      {
        products(first: 12) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify API Error:", json.errors);
    return [];
  }

  return json.data.products.edges.map((edge) => edge.node);
}
