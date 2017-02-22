
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2017, Perry L Miller IV
//  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
//  Tests to demonstrate the behavior of promises.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env mocha */

"use strict";

var assert = require ( "chai" ).assert;
var Promise = require ( "bluebird" );

console.log ( "\n---------- Testing started at:", ( new Date() ).getTime(), " ----------" );


////////////////////////////////////////////////////////////////////////////////
//
//  A function that returns a promise.
//
////////////////////////////////////////////////////////////////////////////////

var delayedDouble = function ( value )
{
  return new Promise ( function ( resolve, reject )
  {
    if ( "reject" == value )
    {
      reject ( "I was asked to reject when doubling" );
    }
    if ( "throw" == value )
    {
      throw new Error ( "I was asked to throw when doubling" );
    }
    resolve ( value + value );
  } );
};


////////////////////////////////////////////////////////////////////////////////
//
//  A function that returns a promise.
//
////////////////////////////////////////////////////////////////////////////////

var delayedSquareOfTheDouble = function ( value )
{
  return new Promise ( function ( resolve, reject )
  {
    delayedDouble ( value )
    .then ( function ( value )
    {
      resolve ( value * value );
    } )
    .catch ( function ( error )
    {
      if ( error.message )
      {
        assert.equal ( error.message, "I was asked to throw when doubling" );
        reject ( new Error ( "I was asked to throw when squaring" ) );
      }
      else if ( "string" === ( typeof error ) )
      {
        assert.equal ( error, "I was asked to reject when doubling" );
        reject ( "I was asked to reject when squaring" );
      }
      else
      {
        console.log ( "\n" );
        console.log ( "Caught an error at 1487791921" );
        console.log ( "Type:", ( typeof error ) );
        console.log ( "Error:", error );
        console.log ( "\n" );
        throw new Error ( "Unknown error type at 1487793243" );
      }
    } );
  } );
};


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "These should resolve and give us an answer", function()
{
  it ( "Doubling a number", function()
  {
    return delayedDouble ( 1 )
    .then ( function ( value )
    {
      assert.equal ( value, 2 );
    } );
  } );

  it ( "Doubling a number twice", function()
  {
    return delayedDouble ( 1 )
    .then ( function ( value )
    {
      return delayedDouble ( value );
    } )
    .then ( function ( value )
    {
      assert.equal ( value, 4 );
    } );
  } );

  it ( "Doubling a number three times", function()
  {
    return delayedDouble ( 1 )
    .then ( function ( value )
    {
      return delayedDouble ( value );
    } )
    .then ( function ( value )
    {
      return delayedDouble ( value );
    } )
    .then ( function ( value )
    {
      assert.typeOf ( value, "Number" );
      assert.equal ( value, 8 );
    } );
  } );

  it ( "Doubling a number then squaring it", function()
  {
    return delayedSquareOfTheDouble ( 2 )
    .then ( function ( value )
    {
      assert.typeOf ( value, "Number" );
      assert.equal ( value, 16 );
    } );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "These should reject and give us an error string", function()
{
  it ( "Asking it to reject", function()
  {
    return delayedDouble ( "reject" )
    .then ( function ( value )
    {
      throw new Error ( "Should not be here 1487791620, value:", value );
    } )
    .catch ( function ( error )
    {
      assert.typeOf ( error, "String" );
      assert.equal ( error, "I was asked to reject when doubling" );
    } );
  } );

  it ( "Asking it to double then reject", function()
  {
    return delayedDouble ( 1 )
    .then ( function ( value )
    {
      return delayedDouble ( "reject" );
    } )
    .then ( function ( value )
    {
      throw new Error ( "Should not be here 1487791630, value:", value );
    } )
    .catch ( function ( error )
    {
      assert.typeOf ( error, "String" );
      assert.equal ( error, "I was asked to reject when doubling" );
    } );
  } );

} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "These should throw and give us an error object", function()
{
  it ( "Asking it to throw", function()
  {
    return delayedDouble ( "throw" )
    .then ( function ( value )
    {
      throw new Error ( "Should not be here 1487791638, value:", value );
    } )
    .catch ( function ( error )
    {
      assert.typeOf ( error, "Error" );
      assert.equal ( error.message, "I was asked to throw when doubling" );
    } );
  } );

  it ( "Asking it to double then throw", function()
  {
    return delayedDouble ( 1 )
    .then ( function ( value )
    {
      return delayedDouble ( "throw" );
    } )
    .then ( function ( value )
    {
      throw new Error ( "Should not be here 1487791650, value:", value );
    } )
    .catch ( function ( error )
    {
      assert.typeOf ( error, "Error" );
      assert.equal ( error.message, "I was asked to throw when doubling" );
    } );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "These should intercept an error and propagate it along", function()
{
  it ( "Asking it to reject, intervene, and propagate the rejection", function()
  {
    return delayedSquareOfTheDouble ( "reject" )
    .then ( function ( value )
    {
      throw new Error ( "Should not be here 1487791660, value:", value );
    } )
    .catch ( function ( error )
    {
      assert.typeOf ( error, "String" );
      assert.equal ( error, "I was asked to reject when squaring" );
    } );
  } );

  it ( "Asking it to throw, intervene, and propagate the rejection", function()
  {
    return delayedSquareOfTheDouble ( "throw" )
    .then ( function ( value )
    {
      throw new Error ( "Should not be here 1487791660, value:", value );
    } )
    .catch ( function ( error )
    {
      assert.typeOf ( error, "Error" );
      assert.equal ( error.message, "I was asked to throw when squaring" );
    } );
  } );
} );
