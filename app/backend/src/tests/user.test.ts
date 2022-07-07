import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

import validUserAdmin from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Check route "/login" and your behavior', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, "findOne").resolves(validUserAdmin as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('User founded and logged with successfully', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: "admin@admin.com",
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.key('token');
  });

  it('Email not informed', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});
