import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import Home from './_root/pages/Home'
import ReservesPage from './_root/pages/ReservesPage'
import ParksPage from './_root/pages/ParksPage'
import MonumentsPage from './_root/pages/MonumentsPage'
import TemplesPage from './_root/pages/ChurchesPage'
import MuseumsPage from './_root/pages/MuseumsPage'
import Dolgorukovo from './_root/pages/dolgorukovo'
import Dankov from './_root/pages/dankov'
import Chap from './_root/pages/chapligin'
import Dobrinka from './_root/pages/dobrinka'
import Dobroe from './_root/pages/dobroe'
import Elec from './_root/pages/elec'
import Gryazi from './_root/pages/gryazi'
import Hlevnoe from './_root/pages/hlevnoe'
import Izmalkovo from './_root/pages/izmalkovo'
import Krasnoe from './_root/pages/krasnoe'
import Lev from './_root/pages/lev'
import Leb from './_root/pages/lebedyan'
import Stan from './_root/pages/stanovoe'
import Ter from './_root/pages/terbuni'
import Usman from './_root/pages/usman'
import Volovo from './_root/pages/volovo'
import Zad from './_root/pages/zadonsk'
import AttractionDetailsPage from './components/shared/AttractionDetailsModal'
import About from './_root/pages/about'
import Help from './_root/pages/help'
import AuthLayout from './_auth/AuthLayout'
import Login from './_auth/forms/Login'
import Signup from './_auth/forms/Singup'

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
      <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Help />} />
          <Route path="/zapovedniki" element={<ReservesPage />} />
          <Route path="/parks" element={<ParksPage />} />
          <Route path="/monuments" element={<MonumentsPage />} />
          <Route path="/churches" element={<TemplesPage />} />
          <Route path="/museums" element={<MuseumsPage />} />
          <Route path="/dolgorukovo" element={<Dolgorukovo />} />
          <Route path="/dankov" element={<Dankov />} />
          <Route path="/chapligin" element={<Chap />} />
          <Route path="/dobrinka" element={<Dobrinka />} />
          <Route path="/dobroe" element={<Dobroe />} />
          <Route path="/elec" element={<Elec />} />
          <Route path="/gryazi" element={<Gryazi />} />
          <Route path="/hlevnoe" element={<Hlevnoe />} />
          <Route path="/izmalkovo" element={<Izmalkovo />} />
          <Route path="/krasnoe" element={<Krasnoe />} />
          <Route path="/lebedyan" element={<Leb />} />
          <Route path="/lev-tolstoy" element={<Lev />} />
          <Route path="/stanovoe" element={<Stan />} />
          <Route path="/terbuni" element={<Ter />} />
          <Route path="/usman" element={<Usman />} />
          <Route path="/volovo" element={<Volovo />} />
          <Route path="/zadonsk" element={<Zad />} />

          <Route path="/attraction/:id" element={<AttractionDetailsPage />} />

        </Route>
      </Routes>
    </main>
  )
}

export default App