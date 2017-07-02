# appSecRadar
Sherif Mansour's (@kerberosmansour) idea and design of a colour-coded radar chart to keep track of technologies in use, whether they are being evaluated, adopted or phased out.<br /><br />
Built with SVG and JavaScript.<br /><br />
## Example
![Example Radar](https://user-images.githubusercontent.com/13433538/27764799-86ec735a-5e9a-11e7-8599-9d11c1120025.png)


## Contents
Updated 2-7-17:<br />
Files split into folders for css, js and other, mainly txt includes. So the main .shtml file is the vehicle to contain everything else.<br />

## Roadmap
Initially, a test object array is hard-coded into a file, but will need to be able to import a csv, json or text file to be of any use.<br /><br />
I've also created a radar in photoshop - and png dots - if preferable to SVGs.<br /><br />

Refresh browser window to re-align dots - until a non-overlapping system is deployed. The 1px black stroke helps identify partially hidden dots and all of them are able to display their information when hovered over.<br /><br />

Legend added:<br />
    It can be moved down if you don't want it covering the radar:<br />
            #legend-wrapper	top:40em;  sits nicely below the radar.<br />
    Adding / changing Legend text:<br />
        .show-legend -	height is set to 33em - change that for another fixed height.<br />
        Or you can set it to auto - but then you lose the nice transition effect.<br />
        Or you can add a scrollbar:<br />
	        change #legend - overflow-y:auto;<br />
	        but then it doesn't look as neat - depends on your colour scheme. It's still not easy to change scrollbars          across all the browsers...(was in IE6!).<br />
    IE9 doesn't have the transition effect.<br />

## Browser Compatibility
    FireFox 54.0.1 (latest version) & the previous version<br />
    Safari 10.1.1<br />
    Chrome 59.0.3071.115 (latest version)<br />
    IE 9
    IE 11
Fixed text box style for IE 9+ : Added display:inline-block - as was mis-aligned.<br />
Haven't tested 10, but 9 & 11 are fine.<br />
    IE8 has nothing - is anybody still using IE8?!<br />
    

