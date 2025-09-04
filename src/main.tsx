import { Blog } from '@src/blog';
import { store } from '@src/redux/store/store';
import '@src/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Blog />
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
