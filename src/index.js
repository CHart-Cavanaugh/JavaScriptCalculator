import { createRoot } from 'react-dom/client';
import AppWrapper from './components/AppWrapper';

import './index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const root = createRoot(document.getElementById("root"));



root.render(<AppWrapper />);