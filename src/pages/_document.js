import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link 
              rel="preconnect" 
              href="https://fonts.googleapis.com"
            />
            <link 
              rel="preconnect" 
              href="https://fonts.gstatic.com" 
              crossOrigin="true"
            />
            <link 
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&display=swap" 
            />
            <link
              rel="preload"
              href="/fonts/Chillax-Variable.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/ClashGrotesk-Variable.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument