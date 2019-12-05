# EduPage Calculator

## Building and adding the extension to Chrome/Firefox

### Reqs
- Node.js 10.16.3
- Angular CLI installed globally (`npm i @angular/cli -g`)

### The process

1. Clone repo
2. Run `npm i`
3. Run `ng build`
4. Load extension
   - Chrome
       - Go to `chrome://extensions`
       - Enable "Developer Mode"
       - Click on "Load Unpacked"
       - Select the `/dist/edupage-calc/` folder
   - Firefox
       - Go to `about:addons`
       - Click on the cog dropdown on the right side of the Manage Your Extensions header
       - Click on Debug Add-ons
       - On the new page click on Load Temporary Add-on
       - Select the `/dist/edupage-calc/` folder

### Development

1. After you built and added the extension as per above steps, developing is quite simple
2. In the project folder, run `ng build --watch` - this will build the extension automatically when you change anything
3. For client (popup) code changes only a close-open is required to see the changes
4. For content script changes, you need to hit the refresh button for this extension in the extensions page and refresh the page you are using for testing