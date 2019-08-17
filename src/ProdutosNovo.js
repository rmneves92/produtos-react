import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Produtos extends Component {

    constructor(props) {
        super(props)


        this.state = {
            redirect: false
        }

        this.handleNewProduto = this.handleNewProduto.bind(this)
    }

    handleNewProduto() {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value,
        }

        this.props.createProduto(produto)
            .then(res => {
                return (
                    this.setState({
                        redirect: '/produtos/categoria/' + produto.categoria
                    })
                )
            })

        this.refs.produto.value = ''
        this.refs.categoria.value = ''
    }

    render() {
        const { categorias } = this.props

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='col-md-4'>
                <h2>Novo Produto</h2>
                <select ref='categoria' className='form-control'>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.categoria}</option>
                    ))}
                </select>

                <input
                    className='form-control'
                    placeholder='Nome do novo produto'
                    ref='produto' />

                <button onClick={this.handleNewProduto} className='btn btn-success'>Salvar</button>
            </div>
        )
    }
}

export default Produtos