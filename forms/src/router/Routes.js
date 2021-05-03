import React from 'react'
import FormRHF from '../components/FormRHF'
import FormFormik from '../components/FormFormik'

export const PATHS = {
  home: '/',
  formik: '/formik',
}

export const ROUTES = [
  {
    component: <FormRHF />,
    path: PATHS.home,
    exact: true,
  },
  {
    component: <FormFormik />,
    path: PATHS.formik,
    exact: true,
  }
]
