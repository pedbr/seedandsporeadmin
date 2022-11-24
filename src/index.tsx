import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import App from './App'
import reportWebVitals from './reportWebVitals'

Sentry.init({
  dsn: 'https://30a625fa39104f7badb4420b12091c68@o1411757.ingest.sentry.io/6750407',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

reportWebVitals()
