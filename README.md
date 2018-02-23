# appSecRadar
Sherif Mansour's (@kerberosmansour) idea and design of a colour-coded radar chart to keep track of technologies in use, whether they are being evaluated, adopted or phased out.<br /><br />
Built with SVG and JavaScript.<br /><br />
## Examples
![radar-7 6-1](https://user-images.githubusercontent.com/29818223/32985377-60ff6faa-ccb1-11e7-89f6-9ccaac5140fe.png)
![radar-7 6-2](https://user-images.githubusercontent.com/29818223/32985378-6119e9a2-ccb1-11e7-93a0-81ebd1423b80.png)
![radar-dots](https://user-images.githubusercontent.com/29818223/33262168-48e36e00-d35d-11e7-9c76-db25f7be92ab.png)
Can move dots without reloading or refreshing screen - on click and move they will find a new random position within their boundary.
![radar_7 7-3](https://user-images.githubusercontent.com/29818223/33029376-5925e9c0-ce10-11e7-9e31-79d7e9f44903.png)
Radii can easily be adjusted to accommodate data.<br />
Sectors will auto add/delete depending on data.
## Set Up
The best way to use the radar with the input in JSON format is with a local server. <br />
There's likely to be a simple server built into your operating system. <br />
Here's how to access it from the command line on a mac OSX: <br />

cd to the directory containing your radar.html <br />
Type: <br />
python -m SimpleHTTPServer 8000 <br />
or type: <br />
php -S localhost:8000 <br />
(doesn't have to be port 8000 -  ie. 8001, 8002... 8888, 3000, 3001 etc. are fine if they're not in use) <br />

In the browser address bar type: http://localhost:8000/radar.html (or whatever port was specified). <br />
Then it should work fine. <br />
(Ctrl C exits the server.)  <br />

Or another way to use the radar is: <br />

Convert/copy the data.json file to a js object file - data.js - and add: <br />
const techList = <br />
before the first opening bracket \[ ... <br />
data.json will be used if the data isn't in data.js. <br />

## Browser Compatibility
    18-11-17
    Tested latest changes in: 
    FireFox 
    Safari 
    Chrome 
    Opera 
    IE 11


