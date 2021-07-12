/**
 * Created by hoangnn on July, 12, 2021.
 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Animal', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET animal', () => {
        it('it should GET all the animal', (done) => {
            chai.request(server)
                .get('/animals')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST animal', () => {
        it('it should POST a animal', (done) => {
            let animal = {
                name: "Bug",
                status: "detected"
            };
            chai.request(server)
                .post('/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Animal successfully added!');
                    res.body.animal.should.have.property('id');
                    res.body.animal.should.have.property('name').eql(animal.name);
                    res.body.animal.should.have.property('status').eql(animal.status);
                    done();
                });
        });
        it('it should not POST a book without status field', (done) => {
            let animal = {
                name: "Bug"
            };
            chai.request(server)
                .post('/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Animal is invalid!");
                    done();
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id animal', () => {
        it('it should GET a animal by the given id', (done) => {
            // TODO add a model to db then get that id to take this test
            let id = 1;
            chai.request(server)
                .get('/animals/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('animal');
                    res.body.animal.should.have.property('id').eql(id);
                    res.body.animal.should.have.property('name');
                    res.body.animal.should.have.property('status');
                    done();
                });
        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id animal', () => {
        it('it should UPDATE a animal given the id', (done) => {
            // TODO add a model to db then get that id to take this test
            let id = 1;
            chai.request(server)
                .put('/animals/' + id)
                .send({
                    name: "Bug",
                    status: "fixed"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('animal');
                    res.body.animal.should.have.property('name').eql("Bug");
                    res.body.animal.should.have.property('status').eql("fixed");
                    done();
                });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id pets', () => {
        it('it should DELETE a animal given the id', (done) => {
            // TODO add a model to db then get that id to take this test
            let id = 1;
            chai.request(server)
                .delete('/animals/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Animal successfully deleted!');
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('roweffected').eql(1);
                    done();
                });
        });
    });
});