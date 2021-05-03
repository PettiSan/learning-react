import React from 'react'
import { ROUTES } from './Routes'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

export function Router() {

  return (
    <BrowserRouter>
      <ul className="flex">
        <li className="mr-2">
          <Link to="/" className="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white">React Hppk Form</Link>
        </li>
        <li className="mr-2">
          <Link to="/formik" className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3">Formik</Link>
        </li>
      </ul>
      <Switch>
        {ROUTES.map((route, i) => {
          const Comp = route.component
          return (
            <Route exact={!!route.exact} key={i} path={route.path}>
              {Comp}
            </Route>
          )
        })}
      </Switch>
    </BrowserRouter>
  )
}
