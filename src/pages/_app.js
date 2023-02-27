import '@/styles/globals.css'
import { ResultsProvider } from '@/service/resultsContext'

export default function App({ Component, pageProps }) {
  return (
    <ResultsProvider>
      <Component {...pageProps} />
    </ResultsProvider>
  )
}
