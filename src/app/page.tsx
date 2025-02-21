'use client'
import { useEffect, useState } from "react";
import Modal from 'react-modal'
import { EventoProps, useEventos } from "./services/useEventos";
import Link from "next/link";
import { customStylesModal } from "./styles/style";
import { Eventos } from "./components/eventos";

export default function Home() {
  const eventosDatabase = useEventos()
  const [eventos, setEventos] = useState<EventoProps[]>([])
  const [isOpen, setIsOpen] = useState(false)

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

        <div className="flex flex-col w-1/2 justify-start items-start">
          <div className="flex flex-row justify-end items-center p-4 w-full">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 border-[1px] border-green-400 bg-green-100 hover:bg-green-200 text-green-900 font-bold rounded"
            >
              Incluir
            </button>
          </div>
          {
            eventos.map(e => (
              <div key={e.id} className="flex flex-row justify-between items-center p-4 w-full bg-slate-100">
                <Link href={String(e.id)} className="flex flex-row items-center font-semibold text-xl hover:text-slate-500">
                  <p>{e.evento} - de {e.datas}</p>
                </Link>
                <div className="flex flex-row gap-2">
                  <button className="p-2 border-[1px] border-blue-400 bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold rounded">
                    Alterar
                  </button>
                  <button className="p-2 border-[1px] border-red-400 bg-red-100 hover:bg-red-200 text-red-900 font-bold rounded">
                    Excluir
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <Modal 
          style={customStylesModal} 
          ariaHideApp={false} 
          isOpen={isOpen}
        >
          <Eventos setIsOpen={setIsOpen} />
        </Modal>

      </div>
    </main>
  )
}
