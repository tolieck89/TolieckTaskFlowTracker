import { ConfigProvider, theme, Button } from 'antd'
import { useState } from 'react'
import ProjectList from './features/projects/ProjectList';
import ProjectModal from './features/projects/ProjectModal';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div>
        <h1>📁 TaskFlow — Projects</h1>

        <Button type="primary" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? 'Light theme' : 'Dark theme'}
        </Button>

      <ProjectModal />

        <ProjectList />

      </div>
    </ConfigProvider>
  )
}

export default App
