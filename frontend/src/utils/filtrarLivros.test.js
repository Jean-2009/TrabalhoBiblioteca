import { describe, it, expect } from 'vitest'
import { filtrarLivros } from './filtrarLivros'

const livros = [
  { _id: '1', titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
  { _id: '2', titulo: 'O Cortiço', autor: 'Aluísio Azevedo' },
  { _id: '3', titulo: 'Coraline', autor: 'Neil Gaiman' },
]

describe('filtrarLivros', () => {
  it('devolve a lista inteira quando o termo está vazio', () => {
    expect(filtrarLivros(livros, '')).toEqual(livros)
    expect(filtrarLivros(livros, '   ')).toEqual(livros)
  })

  it('filtra pelo título ignorando maiúsculas e minúsculas', () => {
    const resultado = filtrarLivros(livros, 'DOM')
    expect(resultado).toHaveLength(1)
    expect(resultado[0].titulo).toBe('Dom Casmurro')
  })

  it('ignora acentos na busca', () => {
    const resultado = filtrarLivros(livros, 'cortico')
    expect(resultado.map((l) => l._id)).toEqual(['2'])
  })

  it('filtra também pelo autor', () => {
    const resultado = filtrarLivros(livros, 'gaiman')
    expect(resultado.map((l) => l.titulo)).toEqual(['Coraline'])
  })

  it('devolve lista vazia quando nada combina', () => {
    expect(filtrarLivros(livros, 'xyz')).toEqual([])
  })

  it('não altera a lista original', () => {
    filtrarLivros(livros, 'dom')
    expect(livros).toHaveLength(3)
  })
})