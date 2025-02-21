import { useForm } from 'react-hook-form'
import { EventoProps } from '../services/useEventos';
type Props = {
  setIsOpen: (isOpen:boolean) => void;
}

export function Eventos({setIsOpen}: Props) {
  const { handleSubmit, register, reset, formState: { errors} } = useForm<EventoProps>()

  function closeModal() {
    setIsOpen(false)
  }

  function gravar(dados: EventoProps) {
    console.log(dados)
  }

  return (
    <div className="w-[700px]">
      <div className="flex flex-row justify-between items-center p-4">
        <h1>Cadastro de Eventos</h1>
        <button 
          onClick={closeModal} 
          className='p-2 border-[1px] border-red-300 bg-red-100 text-red-700 hover:bg-red-50 transition-all rounded-md shadow shadow-red-200 hover:shadow-md hover:shadow-red-200 hover:border[0px]'
        >
          Fechar
        </button>
      </div>

      <form className="w-full p-2 h-full bg-white shadow-xl shadow-slate-600" onSubmit={handleSubmit(gravar)}>
        <h1 className="font-bold text-xl bg-slate-300 p-2 rounded-md text-center">Incluir Evento</h1>
        <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
          <label htmlFor="evento" className="font-semibold">Nome do evento:</label>
          <input 
            {...register('evento', { required: "O nome do evento é obrigatório" })}
            type="text" 
            id="evento" 
            name="evento" 
            className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
          />
          {errors.evento && <p className="text-red-500 text-md">{errors.evento.message}</p>}
        </div>

        <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
          <label htmlFor="datas" className="font-semibold">E-mail:</label>
          <input 
            {...register('datas', { required: "As datas são obrigatórias" })}
            type="text" 
            id="datas" 
            name="datas" 
            className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
          />
          {errors.datas && <p className="text-red-500 text-md">{errors.datas.message}</p>}
        </div>

        <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
          <label htmlFor="inscricoes_abertas" className="font-semibold">Idade:</label>
          <input 
            {...register('inscricoes_abertas')}
            type="text" 
            id="inscricoes_abertas" 
            name="inscricoes_abertas" 
            className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
          />
        </div>

        <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
          <label htmlFor="periodo_inscricoes" className="font-semibold">Identidade:</label>
          <input 
            {...register('periodo_inscricoes', { required: "O período de inscrições é obrigatório" })}
            type="text" 
            id="periodo_inscricoes" 
            name="periodo_inscricoes" 
            className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
          />
          {errors.periodo_inscricoes && <p className="text-red-500 text-md">{errors.periodo_inscricoes.message}</p>}
        </div>

        <div className="flex flex-col gap-2 my-4 px-3 py-6 bg-slate-100 rounded-md">
          <label htmlFor="valor_inscricao" className="font-semibold">Telefone:</label>
          <input 
            {...register('valor_inscricao', { required: "O valor é obrigatório" })}
            type="text" 
            id="valor_inscricao" 
            name="valor_inscricao" 
            className="w-full h-10 border-[1px] border-slate-300 rounded p-2" 
          />
          {errors.valor_inscricao && <p className="text-red-500 text-md">{errors.valor_inscricao.message}</p>}
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <button
            type="submit" 
            name="btnSubmit" 
            className="bg-green-600 hover:bg-green-500 transition-all duration-300 text-white p-2 md:w-60 w-full rounded font-semibold"
          >
            Incluir Evento
          </button>
        </div>
      </form>
    </div>
  )
}