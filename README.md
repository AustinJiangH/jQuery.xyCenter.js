<html>

<head></head>

<body>

<h1>jQquery.xyCenter.js</h1>
<p>A jQuery plugin that makes elements to display in the center of its parent elements.</p>
<ul>
    <li>You can use it on any element with display of BLOCK.</li>
    <li>When the window is resized, the elements still keeps in the center.</li>
    <li>Easy to use.</li>
</ul>


<h1>Install</h1>
<p>Before closing element include:</p>
<ol>
    <li>jQuery</li>
    <li>jquery.xyCenter.js</li>
</ol>

<h1>Usage:</h1>
<h2>JavaScript:</h2>
<pre>
    <code>
$('selector').xyCenter();
    </code>
</pre>
<p>Also, you can customize the options</p>
<pre>
    <code>
$('selector').xyCenter({
    type      : 'margin',  // 'margin', 'relative', 'absolute', 'transform'
    direction : 'xy',      // 'x'(horizontal), 'y'(vertical), 'xy'(both direction)
    rate      : 1/2,

});
    
    </code>
</pre>


<h1>License</h1>
<p>For now, All Rights Reserved.</p>

</body>

</html>


