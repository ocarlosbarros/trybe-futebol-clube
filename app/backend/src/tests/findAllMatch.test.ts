import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
const Matches = require('./mock/models/Matches.json');

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('FindAll Matches with successfully', () => {

    let chaiHttpResponse: Response;

    before(async () => {
        sinon
            .stub(Match, "findAll")
            .resolves(Matches as Match[]);
    });

    after(()=>{
        (Match.findAll as sinon.SinonStub).restore();
    });

    it('matches are returned with successfully', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.be.an('array');
        expect(chaiHttpResponse.body).to.have.be.an('array').that.is.not.empty;
    });
});