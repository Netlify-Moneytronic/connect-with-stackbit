import Container from "../components/container";

import Layout from "../components/layout";
import Head from "next/head";

export default function Success({}) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Using Netlify Forms`}</title>
        </Head>
        <Container>
          <section className="mx-auto max-w-7xl">
            <h1 className="text-7xl font-bold tracking-tight">Form</h1>
          </section>
          <section className="mx-auto max-w-7xl">
            <h2>Thanks</h2>
          </section>
        </Container>
      </Layout>
    </>
  );
}
