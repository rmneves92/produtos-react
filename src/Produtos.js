import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'

class Produtos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editingCategoria: ''
        }

        this.renderCategoria = this.renderCategoria.bind(this)
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
    }

    componentDidMount() {
        this.props.loadCategorias()
    }

    renderCategoria(cat) {
        return <li key={cat.id}>
            <div>
                {this.state.editingCategoria === cat.id &&
                    <div className='input-group'>
                        <div className='input-group-btn'>
                            <input ref={'cat-' + cat.id} type='text' onKeyUp={this.handleEditCategoria} defaultValue={cat.categoria} className='form-control' />
                            <button className='btn btn-warning' title='Cancelar' onClick={this.cancelEditing}>X</button>
                        </div>
                    </div>
                }
            </div>

            {this.state.editingCategoria !== cat.id &&
                <div>
                    <span className='glyphicon glyphicon-remove' onClick={() => this.props.removeCategoria(cat)}></span>
                    <span className='glyphicon glyphicon-edit' onClick={() => this.editCategoria(cat)}></span>
                    <Link to={`/produtos/categoria/${cat.id}`}> {cat.categoria}</Link>
                </div>
            }
        </li>
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })

            this.refs.categoria.value = ''
        }
    }

    editCategoria(categoria) {
        this.setState({
            editingCategoria: categoria.id
        })
    }

    handleEditCategoria(key) {
        if (key.keyCode === 13) {
            this.props.editCategoria({
                id: this.state.editingCategoria,
                categoria: this.refs['cat-' + this.state.editingCategoria].value
            })

            this.setState({
                editingCategoria: ''
            })
        }

        if (key.keyCode === 27) {
            this.cancelEditing()
        }
    }

    cancelEditing() {
        this.setState({
            editingCategoria: ''
        })
    }

    render() {
        const { match, categorias } = this.props

        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='well well-sm'>
                        <input
                            onKeyUp={this.handleNewCategoria}
                            type='text'
                            className='form-control'
                            ref='categoria'
                            placeholder='Nova categoria'
                        />
                    </div>
                    <Link to='/produtos/novo'>
                        <button className='btn btn-primary btn-sm'>Novo produto</button>
                    </Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/novo'}
                        render={(props) => {
                            return <ProdutosNovo {...props}
                                categorias={categorias}
                                createProduto={this.props.createProduto}
                            />
                        }}
                    />
                    <Route path={match.url + '/editar/:id'}
                        render={(props) => {
                            return <ProdutosEditar {...props}
                                categorias={categorias}
                                readProduto={this.props.readProduto}
                                editProduto={this.props.editProduto}
                            />
                        }}

                    />
                    <Route path={match.url + '/categoria/:catId'}
                        render={(props) => {
                            return (<Categoria {...props}
                                loadProdutos={this.props.loadProdutos}
                                loadCategoria={this.props.loadCategoria}
                                produtos={this.props.produtos}
                                categoria={this.props.categoria}
                                removeProduto={this.props.removeProduto}
                            />)
                        }} />
                </div>
            </div>
        )
    }
}

export default Produtos