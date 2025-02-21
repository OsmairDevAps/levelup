import { supabase } from "../database/supabase"

export interface EventoProps {
  id: number;
  evento: string;
  datas: string;
  inscricoes_abertas: boolean;
  periodo_inscricoes: string;
  valor_inscricao: number;
}

export function useEventos() {
  
  async function create(data: Omit<EventoProps, "id">) {
    try {
      const insertedRow = await supabase.from('eventos').insert({
        evento: data.evento,
        datas: data.datas,
        inscricoes_abertas: data.inscricoes_abertas,
        periodo_inscricoes: data.periodo_inscricoes,
        valor_inscricao: data.valor_inscricao
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: EventoProps) {
    try {
      await supabase.from('eventos').update({
        evento: data.evento,
        datas: data.datas,
        inscricoes_abertas: data.inscricoes_abertas,
        periodo_inscricoes: data.periodo_inscricoes,
        valor_inscricao: data.valor_inscricao
      }).eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: number) {
    try {
      await supabase.from('eventos').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const {data} = await supabase.from('eventos').select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  async function find(id: number) {
    try {
      const { data } = await supabase.from('eventos').select('*').eq('id', id)
      return data
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, find }
}