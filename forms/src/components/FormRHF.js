import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, useController } from "react-hook-form";
import InputMask from 'react-input-mask';
import axios from 'axios';

const errosMessage = {
  requiredMsg: 'Please fill out this field.',
  invalidEmailMsg: 'Please type a valid e-mail.',
  passwordMinLengthMsg: 'Min length is 6',
  zipMsg: 'Please type a valid zip code'
}

function RHFInput(props) {
  const { field, fieldState } = useController(props);
  const { name, label, placeholder, type = 'text' } = props;

  return (
    <React.Fragment>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-${name}`}>
        {label} {props.rules && props.rules.required && '*'}
      </label>

      <input {...field} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id={`grid-${name}`} type={type} placeholder={placeholder} />

      {fieldState.error && <p className="text-red-500 text-xs italic">{fieldState.error.message}</p>}
    </React.Fragment>
  )
}

function RHFSelect(props) {
  const [states, setStates] = useState([])
  const { field, fieldState } = useController(props);
  const { name, label, items, isDisabled = false } = props;

  return (
    <React.Fragment>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-${name}`}>
        {label} {props.rules && props.rules.required && '*'}
      </label>

      <div className="relative">
        <select {...field} disabled={isDisabled} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id={`grid-${name}`}>
          {items.map((item, i) => <option key={i} value={item.value}>{item.name}</option>)}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>

      </div>

      {fieldState.error && <p className="text-red-500 text-xs italic">{fieldState.error.message}</p>}
    </React.Fragment>
  )
}

export default function FormRHF() {
  const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);

  const { register, formState: { errors }, handleSubmit, watch, control } = useForm();
  const onSubmit = data => (console.log('form submitted values ', data));
  // console.log('errors ', errors);

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`)
      .then(res => {
        const getStatesRes = res.data;
        let data = [];

        getStatesRes.map(stateRes => data.push({ name: stateRes.nome, value: stateRes.id }));

        setStates(data)
      })
  }, []);

  return (
    <div className="flex justify-center mt-5 p-5 bg-white">
      <form className="flex flex-col items-center justify-center divide-y divide-gray-400 max-w-xl" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">
          <div className="flex-1">
            <RHFInput name="firstName" label="First Name" placeholder="Filipe" control={control} rules={{ required: { value: true, message: errosMessage.requiredMsg } }} />
          </div>

          <div className="flex-1">
            <RHFInput name="lastName" label="Last Name" placeholder="Petitemberte" control={control} rules={{ required: { value: true, message: errosMessage.requiredMsg } }} />
          </div>
        </div>

        <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">
          <div className="flex-1">
            <RHFInput name="email" label="E-mail" placeholder="email@gmail.com" type="email" control={control} rules={{ required: { value: true, message: errosMessage.requiredMsg }, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: errosMessage.invalidEmailMsg } }} />
          </div>
        </div>

        <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">

          <div className="flex-1">

            <RHFInput name="password" label="Password" placeholder="******************" type="password" control={control} rules={{
              required: { value: true, message: errosMessage.requiredMsg }, minLength: {
                value: 6, message: errosMessage.passwordMinLengthMsg
              }, validate: value => value === (watch('passwordConfirm')) || "The passwords do not match"
            }} />
          </div>

          <div className="flex-1">
            <div className="flex-1">

              <RHFInput name="passwordConfirm" label="Confirm Password" placeholder="******************" type="password" control={control} rules={{
                required: { value: true, message: errosMessage.requiredMsg }, minLength: {
                  value: 6, message: errosMessage.passwordMinLengthMsg
                }, validate: value => value === (watch('password')) || "The passwords do not match"
              }} />
            </div>
          </div>

        </div>

        <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">

          <div className="flex-2">

            <RHFSelect name="state" label="State" control={control} items={states} />

          </div>

          <div className="flex-1">

            <RHFSelect name="city" label="City" control={control} items={[]} isDisabled={true} />

          </div>

        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5">
          Button
        </button>
      </form>
    </div>
  )
}
