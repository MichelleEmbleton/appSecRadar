# appSecRadar
Sherif Mansour's (@kerberosmansour) idea and design of a colour-coded radar chart to keep track of technologies in use, whether they are being evaluated, adopted or phased out.<br /><br />
Built with SVG and JavaScript.<br /><br />
## Example
![radar_6](https://user-images.githubusercontent.com/29818223/28502636-541fada6-6fee-11e7-9baf-16c0decabdb7.png)


## Contents
Updated 3-7-17:<br />
Main container file renamed to .html from .shtml - so it can render properly without the need for a virtual server offline. This file contains the content components: The SVG radar, the legend etc.<br />
The css and js files are still separate from the main content.<br /> <br />

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
    IE9 doesn't have the transition effect.<br /><br />
    
7-7-2017 <br />
Added list representation tables for sectors.<br />
Added a table, on the right, for anomalies in the input data - to catch unallocated category/sectors and unallocated statii (? status's) - which can not appear on the radar with this info missing:<br />
A way to check errors in the input data and also add technologies to be assigned later.<br />
Tidied up and consolidated code a bit.<br />
Renamed a few files to better reflect their contents.<br />
Created some 'anomalies' in the test input data to show how it works.<br />

15-7-2017 <br />
Added functionality to add / remove / rename sectors. <br />
Sectors will be created dynamically on whatever category fields are entered into the input data source. Sectors are recalculated equally, the List Representation dropdown menu and tables are also updated. <br />
As before, the dots do jump out of their sectors into the neighbouring sector by a small margin - this needs to be fixed!!<br />
Because the dropdown category menu can't be a fixed height now, it's lost it's glide movement, and so will just appear when clicked on - can't seem to keep this property without having a fixed height.<br />

23-7-17 <br />
Added tables for Status, similar to the Sector tables.<br />
Changes to the Anomaly table to hide it when not needed.<br />
Changes to scripts and data input layouts. Separate file (status_config.js) added for easy configuration of titles, radiuses and legend text:<br />
Status names can now be easily added, deleted or changed - and the radiuses of each group can be easily changed. The titles, dots, tables, legend etc. automatically update with any changes.<br /><br />


## Browser Compatibility
    FireFox 54.0.1 (latest version) & the previous version<br />
    Safari 10.1.1<br />
    Chrome 59.0.3071.115 (latest version)<br />
    IE 9
    IE 11
Fixed text box style for IE 9+ : Added display:inline-block - as was mis-aligned.<br />
Haven't tested 10, but 9 & 11 are fine.<br />
    IE8 has nothing - is anybody still using IE8?!<br />
    I found that IE will not accept \` as an alternative to \" or \' whilst the other browsers do.<br />
       Also, that IE and FF won't accept the svg circle params cx, cy and r on the external css files.
    
