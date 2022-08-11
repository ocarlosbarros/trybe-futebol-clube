import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';
const TeamsMock = require('./mock/models/Teams.json');

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('FindAll Teams with successfully', () => {

    let chaiHttpResponse: Response;

    before(async () => {
        sinon
            .stub(Team, "findAll")
            .resolves(TeamsMock as Team[]);
    });

    after(()=>{
        (Team.findAll as sinon.SinonStub).restore();
    });

    it('teams are returned with successfully', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.be.an('array');
        expect(chaiHttpResponse.body).to.have.be.an('array').that.is.not.empty;
    });
});