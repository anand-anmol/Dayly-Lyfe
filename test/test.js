// Import the dependencies for testing
var chai     = require('chai')
var chaiHttp = require('chai-http');
var app      = require('../app.js');
var assert = require('chai').assert;

//Configure chai.
chai.use(chaiHttp);
chai.should();

describe('App', ()=> {

    it('calendar shows correct month as a number', () => {
        assert.equal(app.month(), '5');
    });
    it('calendar shows correct month', () => {
        assert.equal(app.month_name(), 'May');
    });
    it('calendar shows correct year', () => {
        assert.equal(app.year(), '2020');
    });
    it('calendar shows correct day', () => {
        assert.equal(app.date(), '1');
    });
    it('calendar shows next month when requested', () => {
        assert.equal(app.next_month(), '6');
    });
    it('calendar shows next year when requested', () => {
        assert.equal(app.next_year(), '2021');
    });
    it('calendar shows next date when requested', () => {
        assert.equal(app.next_date(), '2');
    });
    it('calendar shows previous month when requested', () => {
        assert.equal(app.previous_month(), '4');
    });
    it('calendar shows previous year when requested', () => {
        assert.equal(app.previous_year(), '2019');
    });
    it('calendar shows previous date when requested', () => {
        assert.equal(app.previous_date(), '30');
    });

});
