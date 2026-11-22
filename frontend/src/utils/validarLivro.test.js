import { describe, it, expect } from 'vitest'
import { validarLivro } from './validarLivro'

describe('validarLivro', () => {
  it('devolve os dados sem espaços nas pontas', () => {
    const resultado = validarLivro({
      titulo: '  Dom Casmurro ',
      autor: ' Machado de Assis ',
      isbn: ' 9788535911664 ',
    })
    expect(resultado).toEqual({
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      isbn: '9788535911664',
    })
  })

  it('aceita o ISBN ausente e devolve texto vazio', () => {
    const resultado = validarLivro({ titulo: 'Coraline', autor: 'Neil Gaiman' })
    expect(resultado.isbn).toBe('')
  })

  it('lança erro quando o título está vazio', () => {
    expect(() => validarLivro({ titulo: '   ', autor: 'Neil Gaiman' })).toThrow(
      'O título é obrigatório.'
    )
  })

  it('lança erro quando o autor está vazio', () => {
    expect(() => validarLivro({ titulo: 'Coraline', autor: '' })).toThrow(
      'O autor é obrigatório.'
    )
  })
})