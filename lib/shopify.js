const domain = process.env.SHOPIFY_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

// Obtener productos destacados (para home)
export async function getAllProducts() {
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
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `;
  const json = await shopifyFetch(query);
  if (json.errors) {
    console.error("Shopify API Error:", JSON.stringify(json.errors, null, 2));
    return [];
  }
  return json.data.products.edges.map((edge) => edge.node);
}

// Obtener detalles de producto por handle
export async function getProductByHandle(handle) {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        images(first: 10) {
          edges {
            node { url altText }
          }
        }
        variants(first: 30) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  `;
  const json = await shopifyFetch(query, { handle });
  if (json.errors) {
    console.error("Shopify API Error:", json.errors);
    return null;
  }
  return json.data.productByHandle;
}

// Obtener productos de una colección
export async function getCollectionProducts(handle) {
  const query = `
    {
      collectionByHandle(handle: "${handle}") {
        title
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              tags
              images(first: 1) {
                edges {
                  node { url altText }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price { amount }
                    compareAtPrice { amount }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const json = await shopifyFetch(query);
  return (
    json.data.collectionByHandle?.products?.edges?.map((e) => e.node) || []
  );
}

// Login
export async function customerAccessTokenCreate(email, password) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        userErrors { field message }
      }
    }
  `;
  const json = await shopifyFetch(query, { input: { email, password } });
  return json.data.customerAccessTokenCreate;
}

// Registro (con objeto)
export async function customerCreate({ email, password, firstName, lastName }) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email }
        userErrors { field message }
      }
    }
  `;
  const json = await shopifyFetch(query, {
    input: { email, password, firstName, lastName },
  });
  return json.data.customerCreate;
}

// Recuperar contraseña
export async function customerRecover(email) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        userErrors { field message }
      }
    }
  `;
  const json = await shopifyFetch(query, { email });
  return json.data.customerRecover;
}
