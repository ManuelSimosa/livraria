var chai = require('chai')
var server = require('../index')
var chaihttp = require('chai-http')
var should = chai.should()


chai.use(chaihttp)

describe('Geral', () => {
    var idAdmin, idNormal, idLivro, tokenAdmin, tokenNormal, idNormal2
    it('Registrar novo usuario (Administrador) - Sucesso', (done) => {
        const user = {
            type: 1,
            firstName: 'Administrador',
            lastName: '',
            email: 'administrador@mail.com',
            password: '123456',
            token: ''
        }
        chai.request(server).post('/login/new').send(user).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('user')
            idAdmin = res.body.user._id
            done()
        })
    })
    it('Registrar novo usuario (Normal) - Sucesso', (done) => {
        const user = {
            type: 0,
            firstName: 'Usuario',
            lastName: 'Normal',
            email: 'normal@mail.com',
            password: '123456',
            token: ''
        }
        chai.request(server).post('/login/new').send(user).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('user')
            idNormal = res.body.user._id
            done()
        })
    })
    it('Registrar novo usuario (Segundo Normal) - Sucesso', (done) => {
        const user = {
            type: 0,
            firstName: 'Usuario2',
            lastName: 'Normal2',
            email: 'normal2@mail.com',
            password: '123456',
            token: ''
        }
        chai.request(server).post('/login/new').send(user).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('user') 
            idNormal2 = res.body.user._id
            done()
        })
    })
    it('Login (Administrador) - Sucesso', (done) => {
        const user = {
            email: 'administrador@mail.com',
            password: '123456'
        }
        chai.request(server).post('/login/auth').send(user).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('user')
            tokenAdmin = res.body.user.token
            idAdmin = res.body.user._id
            done()
        })
    })
    it('Login (Usuario Normal) - Sucesso', (done) => {
        const user = { 
            email: 'normal@mail.com',
            password: '123456'
        }
        chai.request(server).post('/login/auth').send(user).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('user')
            tokenNormal = res.body.user.token
            idNormal = res.body.user._id
            done()
        })
    })
    it('Inserir Livro (Casas Muertas) - Sucesso ', (done) => {
        const book = {
            title: 'Casas Muertas',
            author: 'Miguel Otero Silva',
            relDate: '1955-11-20T13:40:54.493Z',
            stock: 1,
            genre: 'Novela',
            quant: 1
        }
        chai.request(server).post('/books').set('user_id', idAdmin).set('token', tokenAdmin).send(book).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('_id')
            idLivro = res.body._id
            done()
        })
    })
    it('Inserir livro (Pantaleon y las visitadoras) - Sucesso ', (done) => {
        const book = {
            title: 'Pantaleon y las visitadoras',
            author: 'Mario Vargas Llosa',
            relDate: '1973-11-20T13:40:54.493Z',
            stock: 10,
            genre: 'Drama',
            quant: 10
        }
        chai.request(server).post('/books').set('user_id', idAdmin).set('token', tokenAdmin).send(book).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('_id')
            done()
        })
    })
    it('Ver livro - Sucesso', (done) => {
        chai.request(server).get(`/books/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('_id')
            done()
        })
    })
    it('Alugar livro - Sucesso', (done) => {
        const renter = {
            renterId: idNormal
        }
        chai.request(server).post(`/rents/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).send(renter).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('_id')
            done()
        })
    })
    it('Alugar livro - erro "livro não está em stock"', (done) => {
        const renter = {
            renterId: idNormal2
        }
        chai.request(server).post(`/rents/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).send(renter).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('message')
            done()
        })
    })
    it('Editar livro - erro "Não está em stock"', (done) => {
        const livroEditado = {
            author: 'Manuel Simosa',
        }
        chai.request(server).put(`/books/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).send(livroEditado).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('message')
            console.log('Message: ', res.body.message)
            done()
        })
    })
    it('Retornar livro - successo', (done) => {
        const renter = {
            renterId: idNormal
        }
        chai.request(server).put(`/rents/return/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).send(renter).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('rent')
            done()
        })
    })
    it('Editar livro - Sucesso', (done) => {
        const livroEditado = {
            author: 'Manuel Simosa',
        }
        chai.request(server).put(`/books/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).send(livroEditado).end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('book')
            done()
        })
    })
    it('Deletar livro - Sucesso', (done) => {
        chai.request(server).delete(`/books/id/${idLivro}`).set('user_id', idAdmin).set('token', tokenAdmin).end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    it('Listar livros - Sucesso', (done) => {
        chai.request(server).get('/books').set('user_id', idNormal).set('token', tokenNormal).end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })
    it('Listar livros por genero - Sucesso', (done) => {
        const search = {
            genre: 'Drama',
        }
        chai.request(server).get('/books').set('user_id', idNormal).set('token', tokenNormal).send(search).end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })
})