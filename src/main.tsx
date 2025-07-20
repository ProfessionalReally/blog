import { Blog } from '@src/Blog';
import { StrictMode } from 'react';
import '@src/index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Blog />
		</BrowserRouter>
	</StrictMode>,
);
