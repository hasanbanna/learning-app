const mongoose = require("mongoose")
require('sinon-mongoose')
const Topic = require('../models/topic')

//Require the dev-dependencies
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect


describe("Get all Topics", function(){
  it("should return all topics", function(done){
    const TopicMock = sinon.mock(Topic)
    const expectedResults = { status: true, topics: [] }
    TopicMock.expects('find').yields(null, expectedResults)
    Topic.find(function (err, result){
      TopicMock.verify()
      TopicMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })

  it("should return error", function(done){
    const TopicMock = sinon.mock(Topic)
    const expectedResults = { status: false, error: "Something went wrong" }
    TopicMock.expects('find').yields(expectedResults, null)
    Topic.find(function (err, result){
      TopicMock.verify()
      TopicMock.restore()
      expect(err.status).to.not.be.true
      done()
    })
  })
})

describe("Post a new topic", function(){
  it("should create new topic", function(done){
    const TopicMock = sinon.mock(new Topic({ title: "A new topic from mock"}))
    const topic = TopicMock.object
    const expectedResult = { status: true }

    TopicMock.expects('save').yields(null, expectedResult)
    topic.save(function (err, result){
      TopicMock.verify()
      TopicMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })
  it("should return error when no title is given", function(done){
    const TopicMock = sinon.mock(new Topic({}))
    const topic = TopicMock.object
    const expectedResult = {status: false}

    TopicMock.expects('save').yields(null, expectedResult)
    topic.save(function (err, result){
      TopicMock.verify()
      TopicMock.restore()
      expect(result.status).to.be.false
      done()
    })
  })
})
