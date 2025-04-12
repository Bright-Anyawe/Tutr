// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import routes, { ExtendedRouteObject } from './routes';

// interface RenderOptions {
//   url: string;
// }

// export function render({ url }: RenderOptions) {
//   return renderToString(
//     <React.StrictMode>
//       <StaticRouter location={url}>
//         <AuthProvider>
//           <Routes>
//             {(routes as ExtendedRouteObject[]).map((route) => (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={route.element}
//               />
//             ))}
//           </Routes>
//         </AuthProvider>
//       </StaticRouter>
//     </React.StrictMode>
//   );
// }
