import Head from 'next/head';
import '../styles/globals.css';  // Ensure you still import any other global styles you need

function head({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css"
          integrity="sha384-e6e3e2e7e9e3c84872b5386c292a5ce368255f057bf9a35e7b679070c0e8f10b"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default head;
