import ErrorPage from '../components/pages/Error'
import { withInitialProps } from '../components/pages/withInitialProps'

export default withInitialProps(({ res }): { statusCode?: number } => {
  if (res) {
    return { statusCode: res.statusCode}
  } else {
    return {}
  }
})(ErrorPage)