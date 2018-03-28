const mongoose = require('mongoose')
require('sinon-mongoose')
const Subject = require('../models/subject')
const config = require('../config/config')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

describe('Subjects', function(){
  afterEach(function(){
    mongoose.models = {}
    mongoose.modelSchemas = {}
  })
  it("should return all subjects", function(done) {
    const SubjectMock = sinon.mock(Subject)
    const expectedResult = {status: true, subjects: []}

    SubjectMock.expects('find').yields(null, expectedResult)
    Subject.find(function (err, result){
      SubjectMock.verify()
      SubjectMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })
  it("should return error", function(done){
    const SubjectMock =   sinon.mock(Subject)
    const expectedResult = { status: false, error: "Something went wrong"}
    SubjectMock.expects('find').yields(expectedResult, null)
    Subject.find(function (err, result) {
      SubjectMock.verify()
      SubjectMock.restore()
      expect(err.status).to.not.be.true
      done()
    })
  })
})
