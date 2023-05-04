import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import Main from './main'
function App() {
  return (
    <Main></Main>
  )
}

// mount React component to DOM
const prompt = document.createElement('div')
prompt.id = 'prompt'
document.body.appendChild(prompt)
createRoot(prompt).render(<App />)
