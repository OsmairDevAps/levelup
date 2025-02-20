import { supabase } from "../database/supabase"

export interface FormProps {
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
  async function salvar(data: FormProps) {
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

  async function alterar() {
    try {
      alert('INSCRIÇÃO ALTERADA')
    } catch (error) {
      throw error
    }
  }

  return { salvar, alterar }
}