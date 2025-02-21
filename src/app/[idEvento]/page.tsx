'use client'
import { useForm } from "react-hook-form";
import Image from "next/image";
import logoLJ from '@up/assets/logo_black.png'
import logoLuz from '@up/assets/logoluz.png'
import { FormProps, useInscricoes } from "../services/useInscricoes";
import { useEffect, useState } from "react";
import { EventoProps, useEventos } from "../services/useEventos";

interface Props {
  params: {idEvento: number};
}

export default function Home({ params }: Props) {
  const { handleSubmit, register, reset, watch, setValue, formState:{ errors } } = useForm<FormProps>()
  const [isOpen, setIsOpen] = useState(false)
  const [evento, setEvento] = useState<EventoProps>()
  const eventos = useEventos()
  const inscricoes = useInscricoes()
  const telefone = watch("telefone", "")

  const formatPhoneNumber = (value: string): string => {
    // Remove todos os caracteres que não são números
    const cleaned = value.replace(/\D/g, "");
      // Aplica a máscara (99) 99999-9999
    if (cleaned.length > 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.length > 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length > 2) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return cleaned;
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("telefone", formatted, { shouldValidate: true }); // Atualiza o campo no react-hook-form
  };  

  async function listarEvento() {
    try {
      if (params.idEvento) {
        const response = await eventos.find(params.idEvento)
        if(response) {
          setEvento(response[0])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function gravar(dataForm: FormProps) {
    dataForm.codevento = 1
    dataForm.statuspgto = false
    dataForm.valor = String(evento?.valor_inscricao)
    event?.preventDefault()
    try {
      const inscricao = await inscricoes.create(dataForm)
      console.log('Inscrição gravada: ', inscricao)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listarEvento()
  },[params.idEvento])

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        
        {evento?.inscricoes_abertas ? 
          <form className="w-full md:w-1/2 p-2 h-full bg-white shadow-xl shadow-slate-600" onSubmit={handleSubmit(gravar)}>
            <div className="flex flex-row justify-start items-center p-2 w-full bg-white">
              <Image alt="Logo" src={logoLJ} className="w-12 md:w-24 h-12 md:h-24" />
              <div className="flex flex-col flex-1 justify-center items-center">
                <p className="text-md font-semibold">Inscrições Abertas</p>
                <h1 className="text-2xl font-bold">{evento?.evento}</h1>
                <p className="text-md font-semibold">Período de inscrições: {evento?.periodo_inscricoes}</p>
              </div>
              <Image alt="Logo" src={logoLuz} className="w-12 md:w-24 h-12 md:h-24" />
            </div>
            <h1 className="font-bold text-xl bg-slate-300 p-2 rounded-md text-center">Formulario de Inscrição</h1>
            <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
              <label htmlFor="nome" className="font-semibold">Nome completo:</label>
              <input 
                {...register('nome', { required: "O nome é obrigatório" })}
                type="text" 
                id="nome" 
                name="nome" 
                className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
              />
              {errors.nome && <p className="text-red-500 text-md">{errors.nome.message}</p>}
            </div>

            <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
              <label htmlFor="email" className="font-semibold">E-mail:</label>
              <input 
                {...register('email', { required: "O e-mail é obrigatório" })}
                type="text" 
                id="email" 
                name="email" 
                className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
              />
              {errors.email && <p className="text-red-500 text-md">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 my-4">
              <div className="lg:w-1/3 w-full flex flex-col gap-2 px-3 py-6 bg-slate-100 rounded-md">
                <label htmlFor="idade" className="font-semibold">Idade:</label>
                <input 
                  {...register('idade', { required: "A idade é obrigatória" })}
                  type="text" 
                  id="idade" 
                  name="idade" 
                  className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
                />
                {errors.idade && <p className="text-red-500 text-md">{errors.idade.message}</p>}
              </div>

              <div className="lg:w-1/3 w-full flex flex-col gap-2 px-3 py-6 bg-slate-100 rounded-md">
                <label htmlFor="idade" className="font-semibold">Identidade:</label>
                <input 
                  {...register('identidade', { required: "O documento de identidade é obrigatório" })}
                  type="text" 
                  id="identidade" 
                  name="identidade" 
                  className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
                />
                {errors.idade && <p className="text-red-500 text-md">{errors.idade.message}</p>}
              </div>

              <div className="lg:w-1/3 w-full flex flex-col gap-2 px-3 py-6 bg-slate-100 rounded-md">
                <label htmlFor="telefone" className="font-semibold">Telefone:</label>
                <input 
                  {...register('telefone', { required: "O telefone é obrigatório" })}
                  type="text" 
                  id="telefone" 
                  name="telefone" 
                  placeholder="(62) 99999-9999"
                  value={telefone}
                  onChange={handlePhoneChange}
                  className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
                />
                {errors.telefone && <p className="text-red-500 text-md">{errors.telefone.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
              <label htmlFor="cidade" className="font-semibold">Cidade:</label>
              <select 
                {...register('cidade', { required: "A cidade é obrigatória" })} 
                className="w-full h-10 border-[1px] border-slate-300 rounded p-2"
              >
                <option value="Anápolis">Anápolis</option>
                <option value="Goianápolis">Goianápolis</option>
              </select>
              {errors.cidade && <p className="text-red-500 text-md">{errors.cidade.message}</p>}
            </div>
            
            <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
              <label htmlFor="formapgto" className="font-semibold">Forma de pagamento:</label>
              <select {...register("formapgto")} className="w-full h-10 border-[1px] border-slate-300 rounded p-2">
                <option value="A vista - 300">A vista - R$ 300,00</option>
                <option value="2 x 150">2 x R$ 150,00</option>
                <option value="3 x 100">3 x R$ 100,00</option>
                <option value="4 x 75">4 x R$ 75,00</option>
              </select>
              {errors.formapgto && <p className="text-red-500 text-md">{errors.formapgto.message}</p>}
            </div>
            
            <div className="flex flex-col justify-center items-center gap-2">
              <button
                type="submit" 
                name="btnSubmit" 
                className="bg-green-600 hover:bg-green-500 transition-all duration-300 text-white p-2 md:w-60 w-full rounded font-semibold"
              >
                Salvar Inscrição
              </button>
            </div>
          </form>
        :
        <div className="flex items-start justify-center min-h-screen pt-10">
          <p className="font-bold">Inscrições encerradas</p>
        </div>  
      }
      </div>
    </main>
  )
}

