import React from 'react'
import Tilt from 'react-tilt'

export default function Card(props) {
  const { title, image, description, tags, link } = props.data

  return (
    <Tilt className="flex flex-col p-5 rounded shadow-2xl bg-white" options={{ max: 5, scale: 1 }}>
      <img className="h-64 object-cover self-center" src={image} alt="Sunset in the mountains"></img>

      <div className="px-0 py-4 text-center md:text-left md:px-6">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <ul className="flex flex-wrap flex-col items-center px-0 pt-4 pb-6 md:px-6 md:flex-row">
        {tags.map((tag, i) => {
          return (
            <li key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</li>
          )
        })}
      </ul>
      <a className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 mx-0 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center md:mx-6" href={link} target="_blank" rel="noreferrer">Ler mais</a>
    </Tilt>
  )
}
