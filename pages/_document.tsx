import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class AppDocument extends Document {
  static getInitialProps({ renderPage }: any) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#" />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
