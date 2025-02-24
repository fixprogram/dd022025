import { ChartView } from './components/ChartView'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/:chartId"
        element={
          <Layout>
            <ChartView />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
