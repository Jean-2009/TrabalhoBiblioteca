import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CartaoLivro from './CartaoLivro'

const livro = {
  _id: '1',
  titulo: 'Dom Casmurro',
  autor: 'Machado de Assis',
  isbn: '9788535911664',
}

describe('CartaoLivro', () => {
  it('mostra título, autor e ISBN do livro', () => {
    render(<CartaoLivro livro={livro} />)
    expect(screen.getByText('Dom Casmurro')).toBeInTheDocument()
    expect(screen.getByText('Autor: Machado de Assis')).toBeInTheDocument()
    expect(screen.getByText('ISBN: 9788535911664')).toBeInTheDocument()
  })

  it('mostra "Não informado" quando o livro não tem ISBN', () => {
    render(<CartaoLivro livro={{ ...livro, isbn: null }} />)
    expect(screen.getByText('ISBN: Não informado')).toBeInTheDocument()
  })

  it('chama onEditar e onExcluir com o livro ao clicar nos botões', () => {
    const onEditar = vi.fn()
    const onExcluir = vi.fn()
    render(<CartaoLivro livro={livro} onEditar={onEditar} onExcluir={onExcluir} />)

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))

    expect(onEditar).toHaveBeenCalledWith(livro)
    expect(onExcluir).toHaveBeenCalledWith(livro)
  })
})