import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './Main'; // Ensure to import Main directly
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Main />);
