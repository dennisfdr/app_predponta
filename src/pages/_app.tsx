import type { AppProps } from 'next/app'
import 'primereact/resources/themes/luna-amber/theme.css';         //theme
import 'primereact/resources/primereact.min.css';                  //core css
import 'primeicons/primeicons.css';                               //icons
import 'primeflex/primeflex.css'



function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
