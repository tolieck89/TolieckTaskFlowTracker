import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import './styles/main.css'
import { Provider } from 'react-redux';
import { store } from './app/store.js'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    
    
    
    
    <App />
  
  
  
  
    </Provider>

)
