# EduPage Calculator

This project is under heavy development. Be careful.

## Building and adding the extension to Chrome

### Reqs
- Node.js 10.16.3
- Angular CLI installed globally (`npm i @angular/cli -g`)

### The process

1. Clone repo
2. Run `npm i`
3. Run `ng build`
4. Go to `chrome://extensions`
5. Enable "Developer Mode"
6. Click on "Load Unpacked"
7. Select the `/dist/edupage-calc/` folder

### Development

1. After you built and added the extension as per above steps, developing is quite simple
2. In the project folder, run `ng build --watch` - this will build the extension automatically when you change anything
3. For client (popup) code changes only a close-open is required to see the changes
4. For content script changes, you need to hit the refresh button for this extension in the extensions page and refresh the page you are using for testing

Good luck, have fun!