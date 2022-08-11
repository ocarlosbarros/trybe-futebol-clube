import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';
const TeamMock = require('./mock/models/Team.json');

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('FindById Team with successfully', () => {

    let chaiHttpResponse: Response;

    before(async () => {
        sinon
            .stub(Team, "findByPk")
            .resolves(TeamMock as Team);
    });

    after(()=>{
        (Team.findByPk as sinon.SinonStub).restore();
    });

    it('team is returned with successfully', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/16');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.all.keys('id', 'teamName');
    });
});

describe('FindById Team not found', () => {

    let chaiHttpResponse: Response;

    before(async () => {
        sinon
            .stub(Team, "findByPk")
            .resolves(null);
    });

    after(()=>{
        (Team.findByPk as sinon.SinonStub).restore();
    });

    it('team is not found', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/999');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Team not found!');
    });
});