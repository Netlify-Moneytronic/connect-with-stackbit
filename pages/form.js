import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

export default function FormPage({}) {
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
            <form netlify name="form-example">
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
              />
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
              />
              <input type="text" id="email" name="email" placeholder="Email" />
              <input type="submit" value="Submit" />
            </form>
          </section>
        </Container>
      </Layout>
    </>
  );
}
