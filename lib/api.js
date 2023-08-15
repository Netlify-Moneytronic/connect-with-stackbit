const IS_DEV = process.env.NODE_ENV === "development"; // stackbit runs in "development"
const CONTENT_FIELDS = IS_DEV
  ? `content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}`
  : `content {
  raw
}`;
const ID_FIELD = IS_DEV
  ? `sys {
  id
}`
  : `contentful_id`;
const POST_GRAPHQL_FIELDS = `
${ID_FIELD}
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
  ${ID_FIELD}
}
excerpt
${CONTENT_FIELDS}
`;

async function fetchGraphQL(query, preview = false) {
  const url = IS_DEV
    ? `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`
    : process.env.CONNECT_URL;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        IS_DEV
          ? process.env.CONTENTFUL_PREVIEW_TOKEN
          : process.env.CONNECT_TOKEN
      }`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

function extractPost(fetchResponse) {
  return IS_DEV
    ? fetchResponse?.data?.postCollection?.items?.[0]
    : fetchResponse?.data?.contentfulPost;
}

function extractPostEntries(fetchResponse) {
  return IS_DEV
    ? fetchResponse?.data?.postCollection?.items
    : fetchResponse?.data?.allContentfulPost?.nodes;
}

export async function getPreviewPostBySlug(slug) {
  const query = IS_DEV
    ? `query {
    postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`
    : `query {
    allContentfulPost(where: { slug: "${slug}" }, limit: 1) {
      nodes {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const entry = await fetchGraphQL(query, true);
  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const query = IS_DEV
    ? `query {
    postCollection(where: { slug_exists: true }, order: date_DESC) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`
    : `query {
    allContentfulPost(filter: { slug: {ne: null} }) {
      nodes {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const entries = await fetchGraphQL(query);
  return extractPostEntries(entries);
}

export async function getAllPostsForHome(preview) {
  const query = IS_DEV
    ? `query {
    postCollection(order: date_DESC, preview: ${preview ? "true" : "false"}) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`
    : `query {
    allContentfulPost {
      nodes {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const entries = await fetchGraphQL(query, preview);
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
  const entryQuery = IS_DEV
    ? `query {
    postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`
    : `query {
    contentfulPost(slug: {eq: "${slug}"}) {
        ${POST_GRAPHQL_FIELDS}
    }
  }`;
  const entry = await fetchGraphQL(entryQuery, preview);
  const entriesQuery = IS_DEV
    ? `query {
    postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: true, limit: 2) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`
    : `query {
    allContentfulPost{
      nodes {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const entries = await fetchGraphQL(entriesQuery, preview);
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}
