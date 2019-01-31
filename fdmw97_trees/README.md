<dl>
<dt><a href='#Classes'>Classes</a></dt>
<dd></dd>
<dl>
<dt><a href='#Example'>Example</a></dt>
<dd></dd>
<dl>
<dt><a href='#Source'>Source</a></dt>
<dd></dd>

## Classes

<dl>
<dt><a href="#Sketch">Sketch</a></dt>
<dd></dd>
<dt><a href="#Tree">Tree</a></dt>
<dd></dd>
<dt><a href="#Branche">Branche</a></dt>
<dd></dd>
</dl>

<a name="Sketch"></a>

## Sketch
**Kind**: global class  

* [Sketch](#Sketch)
    * [new Sketch(width, height, [nh], [nv], [maxlife], [nRanTrees], [freeTree], [ran])](#new_Sketch_new)
    * [.nh](#Sketch+nh) ⇒ <code>number</code>
    * [.nh](#Sketch+nh)
    * [.nv](#Sketch+nv) ⇒ <code>number</code>
    * [.nv](#Sketch+nv)
    * [.maxlife](#Sketch+maxlife) ⇒ <code>number</code>
    * [.maxlife](#Sketch+maxlife)
    * [.width](#Sketch+width) ⇒ <code>number</code>
    * [.width](#Sketch+width)
    * [.height](#Sketch+height) ⇒ <code>number</code>
    * [.height](#Sketch+height)
    * [.freeTree](#Sketch+freeTree) ⇒ <code>boolean</code>
    * [.freeTree](#Sketch+freeTree)
    * [.trees](#Sketch+trees)
    * [.trees](#Sketch+trees) ⇒ <code>Array</code>
    * [.ntrees](#Sketch+ntrees) ⇒ <code>number</code>
    * [.ntrees](#Sketch+ntrees)
    * [.nRanTrees](#Sketch+nRanTrees) ⇒ <code>number</code>
    * [.nRanTrees](#Sketch+nRanTrees)
    * [.ran](#Sketch+ran) ⇒ <code>boolean</code>
    * [.ran](#Sketch+ran)
    * [.init()](#Sketch+init)
    * [.draw([g])](#Sketch+draw)
    * [.mouseReleased()](#Sketch+mouseReleased)
    * [.createTree(i, j)](#Sketch+createTree)

<a name="new_Sketch_new"></a>

### new Sketch(width, height, [nh], [nv], [maxlife], [nRanTrees], [freeTree], [ran])
Main class to manage all objects in component


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>number</code> |  | the width of the sketch |
| height | <code>number</code> |  | the height of the sketch |
| [nh] | <code>number</code> | <code>8</code> | the number of columns of trees to be rendered when freeTree and ran are false |
| [nv] | <code>number</code> | <code>3</code> | the number of rows of trees to be rendered when freeTree and ran are false |
| [maxlife] | <code>number</code> | <code>15</code> | the base maximun number of updates of a branch before it splits |
| [nRanTrees] | <code>number</code> | <code>0</code> | the number of trees to be rendered if ran is true |
| [freeTree] | <code>boolean</code> | <code>false</code> | if true a tree is rendered at the mouse cursor location when the left mouse button is clicked |
| [ran] | <code>boolean</code> | <code>false</code> | if true nRanTrees number of trees are rendered in radnom positions of the sketch |

<a name="Sketch+nh"></a>

### sketch.nh ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - number of columns of trees rendered when freeTree and ran are false  
<a name="Sketch+nh"></a>

### sketch.nh
sets nh to input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| nh | <code>number</code> | number of columns to be rendered when freeTree and ran are false |

<a name="Sketch+nv"></a>

### sketch.nv ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - number of rows of trees rendered when freeTree and ran are false  
<a name="Sketch+nv"></a>

### sketch.nv
sets nh to input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| nh | <code>number</code> | number of rows to be rendered when freeTree and ran are false |

<a name="Sketch+maxlife"></a>

### sketch.maxlife ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - maxlife of branch before it splits  
<a name="Sketch+maxlife"></a>

### sketch.maxlife
sets maxlife to input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| maxlife | <code>number</code> | maxlife of branch before it splits |

<a name="Sketch+width"></a>

### sketch.width ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - width of sketch  
<a name="Sketch+width"></a>

### sketch.width
sets width to input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | width of sketch |

<a name="Sketch+height"></a>

### sketch.height ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - height of the sketch  
<a name="Sketch+height"></a>

### sketch.height
sets height to input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| height | <code>number</code> | height of sketch |

<a name="Sketch+freeTree"></a>

### sketch.freeTree ⇒ <code>boolean</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>boolean</code> - whether or not freeTree mode is enabled  
<a name="Sketch+freeTree"></a>

### sketch.freeTree
sets freeTree to input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| freeTree | <code>number</code> | whether or not freeTree should be enabled |

<a name="Sketch+trees"></a>

### sketch.trees
sets the sketches array of trees to equal the input array

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| trees | <code>Array</code> | list of trees |

<a name="Sketch+trees"></a>

### sketch.trees ⇒ <code>Array</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>Array</code> - current list of trees in the sketch  
<a name="Sketch+ntrees"></a>

### sketch.ntrees ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - the number of trees currently in the sketch  
<a name="Sketch+ntrees"></a>

### sketch.ntrees
sets ntrees equal to the input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| ntrees | <code>number</code> | number of trees in sketch |

<a name="Sketch+nRanTrees"></a>

### sketch.nRanTrees ⇒ <code>number</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>number</code> - the number of trees to be rendered if ran is true  
<a name="Sketch+nRanTrees"></a>

### sketch.nRanTrees
sets nRanTrees equal to the input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| nRanTrees | <code>number</code> | number of trees to be rendered if ran is true |

<a name="Sketch+ran"></a>

### sketch.ran ⇒ <code>boolean</code>
**Kind**: instance property of [<code>Sketch</code>](#Sketch)  
**Returns**: <code>boolean</code> - whether or not random mode is enabled  
<a name="Sketch+ran"></a>

### sketch.ran
sets ran equal to the input value

**Kind**: instance property of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| ran | <code>boolean</code> | whether or not random tree mode is enabled or not |

<a name="Sketch+init"></a>

### sketch.init()
populates the sketches list of trees either with a grid of trees if neither freeTree or ran are 
true. Otherwise if ran is true a random number of trees are created in random locations

**Kind**: instance method of [<code>Sketch</code>](#Sketch)  
<a name="Sketch+draw"></a>

### sketch.draw([g])
renders trees to the main canvas or optional p5.Renderer paramter, by calling the grow method 
of each tree and passing the optional p5Renderer parameter

**Kind**: instance method of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| [g] | <code>p5.Renderer</code> | optional p5.Renderer parameter to render to |

<a name="Sketch+mouseReleased"></a>

### sketch.mouseReleased()
creates a random tree at the cursors position if freeTree is true

**Kind**: instance method of [<code>Sketch</code>](#Sketch)  
<a name="Sketch+createTree"></a>

### sketch.createTree(i, j)
creates a new tree at the x and y coordinates (i,j)

**Kind**: instance method of [<code>Sketch</code>](#Sketch)  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | x coordinate of new tree |
| j | <code>number</code> | y coordinate of new tree |

<a name="Tree"></a>

## Tree
**Kind**: global class  

* [Tree](#Tree)
    * [new Tree(start, coeff, index)](#new_Tree_new)
    * [.grow([g])](#Tree+grow)

<a name="new_Tree_new"></a>

### new Tree(start, coeff, index)
A tree that managed branches


| Param | Type | Description |
| --- | --- | --- |
| start | <code>p5.Vector</code> | initial position to grow tree from |
| coeff | <code>number</code> | coefficient used to change the saturation of the tree |
| index | <code>number</code> | the index of the tree in the sketches list of trees |

<a name="Tree+grow"></a>

### tree.grow([g])
renders tree by updating each branch and then calling its display method with the optional p5.Renderer 
paramter

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| [g] | <code>p5.Renderer</code> | optional p5.Renderer parameter to render to |

<a name="Branche"></a>

## Branche
**Kind**: global class  

* [Branche](#Branche)
    * [new Branche(start, stw, angle, gen, index, sketch)](#new_Branche_new)
    * [.update()](#Branche+update)
    * [.display(g)](#Branche+display)

<a name="new_Branche_new"></a>

### new Branche(start, stw, angle, gen, index, sketch)
Single branch on a tree


| Param | Type | Description |
| --- | --- | --- |
| start | <code>p5.Renderer</code> | the starting position of the branch |
| stw | <code>number</code> | the stroke width used to draw the branch |
| angle | <code>number</code> | the angle at which the branch grows |
| gen | <code>number</code> | the rate at which the branch reaches its maxlife |
| index | <code>number</code> | index of the the parent trees branch list containing this branch |
| sketch | [<code>Sketch</code>](#Sketch) | The parent sketch containing this branch |

<a name="Branche+update"></a>

### branche.update()
updates the branch, checking if it has reached its maxlife and then splitting in some of 4 different 
directions or ending the tree if enough branches have spawned. Or if the branch is still alive the 
current direction it s growing in changes

**Kind**: instance method of [<code>Branche</code>](#Branche)  
<a name="Branche+display"></a>

### branche.display(g)
draws current section of tree to main canvas or optional p5.Renderer component

**Kind**: instance method of [<code>Branche</code>](#Branche)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>p5.Renderer</code> | optional p5.Renderer component to draw trees to |


## Example

For my Example page I have used semantic ui in order to style the html form elements that allow the user 
to change the values of various variables of the sketch component. I have also used semantic ui in order 
to style a container to contain the sketch. There are also 2 buttons on the example page that allow the 
user to select whether or not they want to view the sketch or view instructions on how to use the example 
page.\
When the user presses the submit button the page, the DOM is used to access the values held by the html 
form elements and change the values of the sketch object.\
The example page's main javascript script creates a new p5 canvas using the WEBGL parameter. Depending on 
whether or not the 3D option has been selected on the example page a new p5.Renderer object is created either the size of the ui container holding it or the size of a face of the 3D cube rendered in 3D mode. In the example page's draw method the p5.Renderer object is passed to a texture that is rendered to the cube if 3D mode is enabled, or rendered to a flat plane the size of the display area if 3D mode is disabled.

## Source

<dl>
<dt><a href='https://www.openprocessing.org/sketch/627398'>Source</a></dt>
<dd></dd>
<dl>
<dt><a href='http://creativecommons.org/licenses/by-sa/3.0/'>Licence</a></dt>
<dd></dd>


