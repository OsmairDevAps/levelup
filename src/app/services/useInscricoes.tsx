import { supabase } from "../database/supabase"

export interface FormProps {
  id: number;
  codevento?: number;
  nome: string;
  email: string;
  idade: string;
  identidade?:string;
  telefone: string;
  cidade: string;
  valor?: string;
  formapgto?: string;
  statuspgto?: boolean;
}

export function useInscricoes() {

  async function create(data: Omit<FormProps, 'id'>) {
    try {
      const insertedRow = await supabase.from('inscricoes').insert({ 
        codevento: data.codevento,
        nome: data.nome,
        email: data.email,
        idade: data.idade,
        identidade:data.identidade,
        telefone: data.telefone,
        cidade: data.cidade,
        valor: data.valor,
        formapgto: data.formapgto,
        statuspgto: data.statuspgto
       })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: FormProps) {
    try {
      await supabase.from('inscricoes').update({ 
        codevento: data.codevento,
        nome: data.nome,
        email: data.email,
        idade: data.idade,
        identidade:data.identidade,
        telefone: data.telefone,
        cidade: data.cidade,
        valor: data.valor,
        formapgto: data.formapgto,
        statuspgto: data.statuspgto
       }).eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: number) {
    try {
      await supabase.from('inscricoes').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const { data } = await supabase.from('inscricoes').select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list }
}