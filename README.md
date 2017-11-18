# appSecRadar
Sherif Mansour's (@kerberosmansour) idea and design of a colour-coded radar chart to keep track of technologies in use, whether they are being evaluated, adopted or phased out.<br /><br />
Built with SVG and JavaScript.<br /><br />
## Examples
![radar-7 6-1](https://user-images.githubusercontent.com/29818223/32985377-60ff6faa-ccb1-11e7-89f6-9ccaac5140fe.png)
![radar-7 6-2](https://user-images.githubusercontent.com/29818223/32985378-6119e9a2-ccb1-11e7-93a0-81ebd1423b80.png)

## Contents

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
    
    
Updated 3-7-17:<br />
Main container file renamed to .html from .shtml - so it can render properly without the need for a virtual server offline. This file contains the content components: The SVG radar, the legend etc.<br />
The css and js files are still separate from the main content.<br /> <br />

Updated 2-7-17:<br />
Files split into folders for css, js and other, mainly txt includes. So the main .shtml file is the vehicle to contain everything else.<br />
    
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

26-7-17 <br />
Accepts a JSON file as input data.<br />
The test JSON file - 'data.json' - is in the main directory, and simply needs to be replaced with your own data - and named 'data.json'.<br />
To accept a file in another location and/or of different name - the file path at the top of 'js/input_data.js' will need to be edited.<br />

There is a neat little JSON validator here:<br />
https://jsonlint.com  <br />

27-7-17 <br />
A few adjustments so that features can be just deleted from the main html page if not wanted: <br />
for anomaly chart, <br />
pop-up details box, <br />
sector table, <br />
status table. <br />

28-7-17 <br />
Fixed the maths for the sector angles. <br />

31-7-17 <br />
Changed design to go with a white background. <br />
Changed code around to eliminate some globals. <br />

18-11-17 <br />
New features added: <br />

1. Subcategories : <br />
	Added new column SUBCAT next to CAT. on JSON input data file. <br />
	On the test data file there are 3 subcategories:   <br />
	   Mobile, Cloud, Client-Side - but I've allowed for up to 6.  <br />
	If no subcat is entered the dots don't show in subcat view.   <br />
	The names can be changed/added to/deleted via the subcat_config file.  <br />
	If the subcats aren't recorded on the subcat_config file, they appear in the anomaly list as 'Unallocated Subcategory'.   <br />
	(The test data has one listed as 'X' and one as blank to show this.)  <br />
	The view mode can be changed via a new drop-down menu - Radar View Mode.   <br />
	New subcats entered on the subcat_config file will also show up on this menu.	I've chosen the colors to contrast with the classic colors. They can be changed on the radar.css file (.dot-sub1 etc) - color names instead of hex values are fine.  <br />

2. Dots now have directional arrows:  <br />
  Added column DIRECTION next to the STATUS column, in which the values can be entered manually when status is manually changed.  <br />
		Arrow length = velocity: <br />
		Values -n to +n: <br />
		-n for outgoing techs.  <br />
		+n for incoming techs.  <br />
		Any values accepted (values expected are -6 to +6).  <br />
		Use larger values for longer arrows.  <br />
		Can also leave blank.  <br />
		Leaving blank or 0 = no arrow, just dot.  <br />

3. List tables are now draggable.  <br />
	Onclick/double-click - to bring to front:  <br />
	The layer position is based on z-index (click = +1)  <br />
	The new subcategories are on all 3 tables.  <br />

Notes on persisting data between file loads/screen refreshes:  <br />
There doesn't seem to be a way to write to a file with JS - so I think the best ways to persist data are:  <br />
1. One or two more simple changes when the input data is altered by the user - as implemented in this version.  <br />
2. Local storage  <br />
Is there a better solution I'm not seeing?  <br />

Use of 'Local Storage': <br />

Pros:  <br />
1. Subcats can be changed/deleted/added dynamically just by changing the subcat on the data input file - removing the need for the subcat_config file.  <br />
2. Directional arrows can also dynamically update - removing the need for the DIRECTION column in the data input file. <br />

Cons:  <br />
1. This will take control away from the user and the program.  <br />
2. Portability is lost - browsers might be changed, caches might be cleared - it is no longer self-contained.  <br />

The subcat_config file is likely to be only needed on first set-up (to change Mobile, Cloud and Desktop to different names or add/delete subcats) - and to make the odd changes.  <br />

The subcats did work very well without the subcat_config file, using dynamic keys linked to the subcat names - except that when new data gets added to the list the color keys change around depending on the order of the subcats on the input data. Asking the user to add the subcats in the same order every time doesn't seem acceptable - unless they group their data in this way anyway, then it will work. <br />

## Browser Compatibility
    18-11-17
    Tested latest changes in: 
    FireFox 
    Safari 
    Chrome 
    Opera 
    Not yet tested in: 
    IE 11


