# AppSec Technology Radar
The AppSec Technology Radar is a set of technologies and best practices inspired by ThoughtWorks's Technology radar.
The objective is to provide developers with new trends in security technologies, design patterns, and tools.<br />

Built with SVG and JavaScript.<br /><br />
## Examples
![radar-7 6-1](https://user-images.githubusercontent.com/29818223/32985377-60ff6faa-ccb1-11e7-89f6-9ccaac5140fe.png)
![radar_7 7-3](https://user-images.githubusercontent.com/29818223/33029376-5925e9c0-ce10-11e7-9e31-79d7e9f44903.png)

## Set Up
The file structure should be: <br />
```
directory - ie. AppSecRadar/
    dist/ ---  data.json
    src/ ----  index.html
               css/ --- the 7 css files
               js/ ---  the 7 js files 
                        elements/ ---  the 12 js files in elements
    .babelrc
    package.json
    webpack.config.js
```
In the console - CD to the directory that contains your appSecRadar and type: <br />
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
To change your data path - you can change the path in **LoadData.js**. **Axios** is used as the http client. <br />
The default path is **localhost:8080** which points to the **data.json** in **dist/**.  <br />
To change the radii to fit the data better - change **RADIUS** in **statusConfig.js**.  <br />
To change the status titles on the radar - also change in **statusConfig.js** - they will be reflected everywhere else. <br />
To change the sector names - just use different ones in the **CAT** field of your input data. Can add more or remove sectors. <br />
To change or add subcat names - in **subcatConfig.js**. <br />
You can move individual dots by clicking on them - they will find a new random position within their boundary. Sometimes they get trapped in a very narrow range so you might have to be persistent - and sometimes the green dots in the center circle jump borders - but eventually go back!

## Browser Compatibility
    19th May 2019
    Tested latest changes in: 
    FireFox 
    Safari 
    Chrome 
    Opera 
    IE 11


