import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div>Ignite Timer projecto 02</div>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
