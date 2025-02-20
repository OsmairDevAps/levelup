import { supabase } from "../database/supabase"

export interface EventoProps {
  id: number;
  evento: string;
  datas: string;
  inscricoes_abertas: boolean;
  periodo_inscricoes: string;
}

export function useEventos() {
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

  return { list, find }
}