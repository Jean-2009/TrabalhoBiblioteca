import { describe, it, expect } from 'vitest'
import { extrairLista } from './api'

describe('extrairLista', () => {
  it('devolve o próprio array quando a API responde com array puro', () => {
    const resposta = [{ _id: '1' }, { _id: '2' }]
    expect(extrairLista(resposta)).toEqual(resposta)
  })

  it('extrai data quando a API responde com envelope { data, meta }', () => {
    const resposta = { data: [{ _id: '1' }], meta: { total: 1 } }
    expect(extrairLista(resposta)).toEqual([{ _id: '1' }])
  })

  it('devolve lista vazia para respostas fora do formato esperado', () => {
    expect(extrairLista(null)).toEqual([])
    expect(extrairLista({ erro: 'algo' })).toEqual([])
  })
})