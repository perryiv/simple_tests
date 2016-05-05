
( function() {


var now = function()
{
  return window.performance.now();
}


var makeAndFillArray = [];


makeAndFillArray.push ( function ( num, value ) // 0
{
  var values = [];
  for ( var i = 0; i < num; ++i )
  {
    values.push ( value );
  }
  return values;
} );


makeAndFillArray.push ( function ( num, value ) // 1
{
  return Array ( num ).fill ( value );
} );


makeAndFillArray.push ( function ( num, value ) // 2
{
  var values = new Array ( num );
  for ( var i = 0; i < num; ++i )
  {
    values[i] = value;
  }
  return values;
} );


makeAndFillArray.push ( function ( num, value ) // 3
{
  var values = [];
  for ( var i = 0; i < num; ++i )
  {
    values[i] = value;
  }
  return values;
} );


makeAndFillArray.push ( function ( num, value ) // 4
{
  var values = [];
  values.length = num;
  for ( var i = 0; i < num; ++i )
  {
    values[i] = value;
  }
  return values;
} );


makeAndFillArray.push ( function ( num, value ) // 5
{
  return new Float64Array ( num ).fill ( value );
} );


var start = null;
var value = Math.PI;
var a = null;
var fun = null;
var html = "<br/><blockquote><table>\n<tr><th>Method</th><th>Length</th><th>Time</th></tr>";

var test = function ( length )
{
  html += "\n<tr><td>----</td></tr>"
  for ( var i = 0; i < makeAndFillArray.length; ++i )
  {
    start = now();
    a = makeAndFillArray[i] ( length, value );
    html += ( "\n<tr><td>" + i + "</td><td align=\"right\">" + a.length + "</td><td align=\"right\">" + ( now() - start ).toFixed ( 2 ) + "</td></tr>" );
    a.length = 0;
  }
}


test ( 10 );
test ( 1000 );
test ( 100000 );
test ( 10000000 );
test ( 40000000 );


html += "\n</table></blockquote>";
document.getElementById ( "app" ).innerHTML = html;

}());
