import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app.css';
import { AppLayout } from '@/components/AppLayout';
import { Home } from '@/home/Home';
import { Fractals } from '@/fractals/Fractals';
import { Gear } from '@/gear/Gear';
import { NotFound } from '@/notfound/NotFound';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home />, handle: { title: 'Fractal Skip Hub' } },
      { path: '/fractals', element: <Fractals />, handle: { title: 'Fractal Skips' } },
      { path: '/gear', element: <Gear />, handle: { title: 'Gear Recommendations' } },
      { path: '*', element: <NotFound />, handle: { title: 'Fractal Skip Hub' } },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
