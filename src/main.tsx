import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>
)
