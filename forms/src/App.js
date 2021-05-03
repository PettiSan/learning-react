
import React from 'react';
import Card from './components/Card';
import FormikLogo from './assets/images/formik.png';
import RHFLogo from './assets/images/react-hooks-form.png';
import { Router } from './router/Router';

const cards = [
  {
    title: 'React Hook Form',
    link: 'https://react-hook-form.com/get-started#IntegratingwithUIlibraries',
    image: RHFLogo,
    description: 'React Hook Form embraces uncontrolled form validation. This reduces your number of rerenders to the bare minimum.',
    tags: ['Typescript', 'React Hooks', 'React Native', 'Performático', '5 kB']
  },
  {
    title: 'Formik',
    link: 'https://formik.org/docs/overview',
    image: FormikLogo,
    description: 'Formik is one of the most popular form libraries in the React ecosystem. It allows you to easily build complex forms, and it works nicely with yup validation.',
    tags: ['Mais popular', 'Typescript', 'React Native', '13.1 kB']
  }
]

function App() {
  return (
    <div className="p-2 mx-auto max-w-screen-2xl box-content bg-purple-800 h-full font-mono md:p-10">
      <div className="p-5 rounded m-2 bg-gradient-to-r from-red-500 md:m-10">
        <div className="flex flex-col text-center pb-10 text-white">
          <h1 className="text-3xl  uppercase md:text-6xl">React<br />Formulários</h1>
          <p className="text-base ">Diferentes integrações de formulários feitos em React, utilizando diversas bibliotecas.</p>
        </div>
        <div className="grid grid-cols-1 gap-10 mb-10 lg:grid-cols-2">
          <Card data={cards[0]}></Card>
          <Card data={cards[1]}></Card>
        </div>
        <Router />
      </div>
    </div>
  );
}

export default App;
