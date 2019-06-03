# AppSec Technology Radar
The AppSec Technology Radar is a set of technologies and best practices inspired by ThoughtWorks's Technology radar.
The objective is to provide developers with new trends in security technologies, design patterns, and tools.<br />

Built with SVG and JavaScript.<br /><br />
## Examples
![AppSecRadar](radar-2019-05-28.png?raw=true "AppSecRadar")
![AppSecRadar](radar-subcat-mode.png?raw=true "AppSecRadar")

## Set Up
The file structure: <br />
```
directory - ie. AppSecRadar/
    dist/ ---  data.json
    src/ ----  index.html
               css/ --- the 7 css files
               js/ ---  the 8 js files 
                        elements/ ---  the 11 js files in elements
    .babelrc
    package.json
    webpack.config.js
```
Assuming you have **npm** and **node** already installed on your machine: <br />
In the console - cd to the directory that contains your appSecRadar and type: <br />
```
npm install
```
to get the dependencies from package.json

to run in dev mode:     
```
npm start
```
This will open a page in your Google Chrome browser by default: localhost:8080   <br />
If you want it to auto open in a different browser - you can change this in package.json:
```
"start": "webpack-dev-server --mode development --open 'google chrome'"
```
Use the **data.json** file in **dist/** to play around with the example data and to use as a template for your own data. <br />
The 7 fields should all be present, but can be empty. <br />

To run in production mode:  
```
npm run build
```
**index.html, style.css** and **main.js** should automagically appear in **/dist** with the links added to **index.html** <br />
then the **dist** can be used on it's own. <br />   

## Configure
 - To change your data path - you can change the path in **LoadData.js**. **Axios** is used as the http client. <br />
The default path is **localhost:8080** which points to the **data.json** in **dist/**.  <br />
 - To change the radii to fit the data better - change **RADIUS** in **statusConfig.js**.  <br />
 --  They can also now be adjusted by clicking and dragging the circles when the edges light up blue. <br />
 
 - To change the status titles on the radar - also change in **statusConfig.js** - they will be reflected everywhere else. <br />
 - To change the sector names - just use different ones in the **CAT** field of your input data. Can add more or remove sectors. <br />
 - To change or add subcat names - in **subcatConfig.js**. <br />
 - Where there's no category (or subcat, in the subcat mode) specified, the dots appear as translucent 'ghosts'. This may be annoying in large data sets with alot of cats / subcats unallocated. It's easy to switch off: <br />
 -- in **radar.css** : change: ```.dot-sub0,  
              .dot-c0  { 
	              fill: var(--ghost); 
	                background-color: var(--ghost);
           }``` <br />           
 --  to: 
       ```    .dot-sub0,
             .dot-c0  {
	             display: none;
            }```  <br />    
 
 ## To use
  - Hovering over the radar dots will display their details in the top right corner. <br />
  - Clicking on individual dots will move them to a new random position within their boundary. <br />
  - Clicking and dragging on a circle when it's outer edge lights up blue will resize it. <br />
  - Sectors can be switched between either all equal or in proportion to the data in the **Radar View Mode** chart. <br />
   -- The dots will find their new positions. <br />
   -- The buttons can also be used to just rearrange the dots, without having to refresh the browser. <br />
   -- The transitions works best in Chrome and Opera.

## Browser Compatibility
    2nd June 2019
    Tested latest changes in: 
    FireFox - new transitions on radar not working
    Safari - new transitions on radar not working
    Chrome - all tranitions good
    Opera - all transitions good
    IE 11 - not tested in IE yet


