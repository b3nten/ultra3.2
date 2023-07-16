import React from "react"
import { createRoot } from 'react-dom/client';
import App from "./app.tsx"

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(React.createElement(App));