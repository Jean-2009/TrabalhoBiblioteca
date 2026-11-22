import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FormularioLivro from './FormularioLivro'

describe('FormularioLivro', () => {
  it('mostra a mensagem de título obrigatório ao enviar vazio, sem chamar onSalvar', async () => {
    const onSalvar = vi.fn()
    render(<FormularioLivro onSalvar={onSalvar} />)

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('O título é obrigatório.')
    expect(onSalvar).not.toHaveBeenCalled()
  })

  it('mostra a mensagem de autor obrigatório quando só o título foi preenchido', async () => {
    const onSalvar = vi.fn()
    render(<FormularioLivro onSalvar={onSalvar} />)

    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Coraline' } })
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('O autor é obrigatório.')
    expect(onSalvar).not.toHaveBeenCalled()
  })

  it('envia os dados limpos e esvazia o formulário depois de salvar', async () => {
    const onSalvar = vi.fn().mockResolvedValue()
    render(<FormularioLivro onSalvar={onSalvar} />)

    fireEvent.change(screen.getByLabelText('Título'), { target: { value: '  Coraline ' } })
    fireEvent.change(screen.getByLabelText('Autor'), { target: { value: 'Neil Gaiman' } })
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() =>
      expect(onSalvar).toHaveBeenCalledWith({
        titulo: 'Coraline',
        autor: 'Neil Gaiman',
        isbn: '',
      })
    )
    await screen.findByRole('button', { name: 'Cadastrar' })
    expect(screen.getByLabelText('Título')).toHaveValue('')
  })

  it('entra em modo edição com os campos preenchidos e o botão Cancelar', () => {
    const livro = { _id: '1', titulo: 'Dom Casmurro', autor: 'Machado de Assis', isbn: null }
    render(<FormularioLivro livroInicial={livro} onSalvar={vi.fn()} onCancelar={vi.fn()} />)

    expect(screen.getByLabelText('Título')).toHaveValue('Dom Casmurro')
    expect(screen.getByLabelText('Autor')).toHaveValue('Machado de Assis')
    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
  })
})