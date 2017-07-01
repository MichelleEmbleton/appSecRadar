# appSecRadar
Sherif Mansour's idea and design of a colour-coded radar chart to keep track of technologies in use, whether they are being evaluated, adopted or phased out.<br /><br />
Built with SVG and JavaScript.<br /><br />
## Example
![Example Radar](https://user-images.githubusercontent.com/13433538/27764799-86ec735a-5e9a-11e7-8599-9d11c1120025.png)


## Contents
Contains 2 files at present - the main .shtml file containing the SVGs and the JS and a small CSS file - which may be best split into separate files if the project is going to grow?!<br /><br />
## Roadmap
Initially, a test object array is hard-coded into the page, but will need to be able to import a csv, json or text file to be of any use.<br /><br />
I've also created a radar in photoshop - and png dots - if preferable to SVGs.<br />

## Browser Compatibility
    FireFox 54.0.1 (latest version) & the previous version<br />
    Safari 10.1.1<br />
    Chrome 59.0.3071.115 (latest version)<br />
    IE 9
    IE 11
Fixed text box style for IE 9+ :<br />
Haven't tested 10, but 11 is fine.<br />
    For IE - Added display:inline-block to .tx - as was mis-aligned.<br /><br />
    IE8 has nothing - is anybody still using IE8?!<br />
    Found missing end tag - fixed.<br /><br />
Refresh browser window to re-align dots - until a non-overlapping system is deployed. The 1px black stroke helps identify partially hidden dots and all of them are able to display their information when hovered over.<br />
