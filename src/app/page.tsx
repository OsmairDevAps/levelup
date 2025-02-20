'use client'
import { useEffect, useState } from "react";
import { FiArrowRight } from 'react-icons/fi'
import { EventoProps, useEventos } from "./services/useEventos";
import Link from "next/link";

type Props = {
  idEvento: number;
}

export default function Home({ idEvento }: Props) {
  const eventosDatabase = useEventos()
  const [eventos, setEventos] = useState<EventoProps[]>([])

  async function listarEventos() {
    try {
      const response = await eventosDatabase.list()
      if(response) {
        setEventos(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listarEventos()
  },[])

  return (
    <main>
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">FORMULARIOS DE INSCRIÇÃO DISPONÍVEIS</h1>
        </div>
        <div className="flex flex-col w-1/3 justify-start items-start">
          {
            eventos.map(e => (
              <Link key={e.id} href={String(e.id)} className="flex flex-row items-center font-semibold text-xl hover:text-slate-500">
                <FiArrowRight size={20} className="mr-2" />
                <p>{e.evento}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </main>
  )
}
