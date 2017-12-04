
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2017, Perry L Miller IV
//  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
//  Tests to demonstrate the behavior of MessagePack.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env mocha */

"use strict";

const chai = require ( "chai" );
const messagePack = require ( "msgpack5" )();

const expect = chai.expect;

chai.use ( require ( "chai-roughly" ) );

console.log ( "\n---------- Testing started at:", ( new Date() ).toLocaleTimeString(), " ----------" );


////////////////////////////////////////////////////////////////////////////////
//
//  Convert the object to a MessagePack buffer.
//
////////////////////////////////////////////////////////////////////////////////

const convertObjectToMessagePack = function ( obj )
{
  return messagePack.encode ( obj );
};


////////////////////////////////////////////////////////////////////////////////
//
//  Convert the MessagePack buffer to an object.
//
////////////////////////////////////////////////////////////////////////////////

const convertMessagePackToObject = function ( mp )
{
  return messagePack.decode ( mp );
};


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "When converting an object to a MessagePack buffer", function()
{
  const original = {
    s: "string",
    i: 42,
    d: 42.42,
    a: [ 1, 2, 3 ]
  };

  it ( "We get the same object back", function()
  {
    const a = convertObjectToMessagePack ( original );
    const b = convertMessagePackToObject ( a );

    expect ( original ).to.roughly ( 0.001 ).deep.equal ( b );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "When converting typed arrays a MessagePack buffer", function()
{
  it ( "We do not get the same object back", function()
  {
    const original = {
      tai16: new Int16Array ( [ 1, 2, 3 ] ),
      tai32: new Int32Array ( [ 1, 2, 3 ] ),
      tau16: new Uint16Array ( [ 1, 2, 3 ] ),
      tau32: new Uint32Array ( [ 1, 2, 3 ] ),
      taf32: new Float32Array ( [ 1, 2, 3 ] ),
      taf64: new Float64Array ( [ 1, 2, 3 ] )
    };

    const a = convertObjectToMessagePack ( original );
    const b = convertMessagePackToObject ( a );

    expect ( original ).to.not.deep.equal ( b );
  } );

  it ( "We get an object with the same numbers", function()
  {
    const original = {
      tai16: new Int16Array ( [ 0, 1, 2 ] ),
      tai32: new Int32Array ( [ 0, 1, 2 ] ),
      tau16: new Uint16Array ( [ 0, 1, 2 ] ),
      tau32: new Uint32Array ( [ 0, 1, 2 ] ),
      taf32: new Float32Array ( [ 0, 1, 2 ] ),
      taf64: new Float64Array ( [ 0, 1, 2 ] )
    };

    const expected = {
      tai16: { 0: 0, 1: 1, 2: 2 },
      tai32: { 0: 0, 1: 1, 2: 2 },
      tau16: { 0: 0, 1: 1, 2: 2 },
      tau32: { 0: 0, 1: 1, 2: 2 },
      taf32: { 0: 0, 1: 1, 2: 2 },
      taf64: { 0: 0, 1: 1, 2: 2 }
    };

    const a = convertObjectToMessagePack ( original );
    const b = convertMessagePackToObject ( a );

    expect ( expected ).to.deep.equal ( b );
  } );
} );
