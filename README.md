# angular-meteor-boilerplate
View the project at <a href="http://angular-meteor-boilerplate.meteor.com">http://angular-meteor-boilerplate.meteor.com</a>

This boilerplate is here to give you a starting point for your angular-meteor projects. Essential atmosphere packages are included to give you features like roles and collection schemas out-of-the-box.

## Motivation

I really love Meteor for at least <a href="http://docs.meteor.com/#/full/sevenprinciples">seven reasons</a>. However, I'm not in love with <a href="https://www.meteor.com/blaze">Blaze</a> just yet. Blaze is still very young. The documentation is lackluster, spacebars just doesn't cut it against robust frameworks like Angular, and there aren't many great UI packages just yet (like a ui-bootstrap for spacebars). All of this will come in time, but in the meantime, there's <a href="http://angularjs.meteor.com/">angular-meteor</a>! In fact, angluar-meteor incorporates both <a href="http://angularjs.meteor.com/manifest">Angular and Blaze</a> so you can slowly migrate to Blaze, or slowly migrate to Angular, or use both together forever ♥.

## Installation

1. Clone the project <code>git clone https://github.com/srtucker22/angular-meteor-boilerplate.git</code>
2. Go to the primary directory <code>cd angular-meteor-boilerplate</code>
3. Run meteor to get all the packages <code>meteor</code>
4. Add a settings.json to the primary directory <code>touch settings.json</code>
5. Add your personal settings for the following services included in meteor-cryptogram (or remove the ones you don't want)

        ```
        {
          "facebook" : {
            "appId": "YOUR_APP_ID",
            "secret": "YOUR_APP_SECRET"
          },
          "kadira": { 
            "appId": "YOUR_APP_ID", 
            "appSecret": "YOUR_APP_SECRET" 
          },
          "papertrail" : {
            "port" : YOUR_PORT_NUMBER
          }
        }
        ```

6. run the app with the settings <code>meteor --settings settings.json</code>
7. enjoy!

### Adding allow rules for external URLs

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) adds rules to deny all operations from external URLs.
This helps dealing with clickjacking and other XSS methods used to attack the client. To whitelist a url, add following to 
__server/config/security.js__

```javascript
BrowserPolicy.content.allowOriginForAll(YOUR_URL);
```

Other security enforcing packages like [audit-argument-checks](https://docs.meteor.com/#/full/auditargumentchecks) and 
[matteodem:easy-security](https://github.com/matteodem/meteor-easy-security) have also been added.

## Structure

### Packages Used

* Meteor Core
  * meteor-platform
* Angular
  * [urigo:angular](https://github.com/Urigo/angular-meteor)
  * [angularui:angular-ui-router](https://atmospherejs.com/angularui/angular-ui-router)
* Collections
  * [aldeed:collection2](https://github.com/aldeed/meteor-collection2)
  * [dburles:collection-helpers](https://github.com/dburles/meteor-collection-helpers)
* Accounts
  * [accounts-password](https://github.com/meteor/meteor/tree/devel/packages/accounts-password)
  * [accounts-facebook](https://github.com/meteor/meteor/tree/devel/packages/accounts-facebook)
  * [service-configuration](https://atmospherejs.com/meteor/service-configuration)
* UI and UX
  * [fastclick](https://github.com/meteor/meteor/tree/devel/packages/fastclick)
  * [meteorhacks:fast-render](https://github.com/meteorhacks/fast-render)
  * [natestrauser:animate-css](https://github.com/nate-strauser/meteor-animate-css/)
  * [mizzao:bootstrap-3](https://github.com/mangasocial/meteor-bootstrap-3)
* Security
  * [browser-policy](https://github.com/meteor/meteor/tree/devel/packages/browser-policy)
  * [audit-argument-checks](https://github.com/meteor/meteor/tree/devel/packages/audit-argument-checks)
  * [matteodem:easy-security](https://github.com/matteodem/meteor-easy-security)
* Development
  * [coffeescript](https://github.com/meteor/meteor/tree/devel/packages/coffeescript)
  * [underscore](https://github.com/meteor/meteor/tree/devel/packages/underscore)
  * [mquandalle:bower](https://github.com/mquandalle/meteor-bower/)
* Monitoring
  * [meteorhacks:kadira](https://github.com/meteorhacks/kadira/)
  * [wylio:winston-papertrail](https://github.com/Wylio/meteor-winston-papertrail/)

The "insecure" and "autopublish" packages are removed by default (they make your app vulnerable).

### Folder structure

```
client/         # Client folder
    config/             # Configuration files (on the client)
  lib/                # Library files that get executed first
    scripts/            # Javascript files including app.js and modernizr
    styles/         # clutch css files -- normalize.css
  utilities/          # Contains common services and directives
  views/          # Contains all views
    home/         # example view module
  app.routes.js          # ui-router config
  index.html         # main html page
  main.css         # main css file
lib/                # Library files that get executed first
  models/          # Model files, for each Meteor.Collection
private/                # Private files
public/                 # Public files
  assets/                # Image assets
server/         # Server folder
  config/                # Configuration files (on the server)
  lib/                # Server side library folder
  publications/       # Collection publications
  startup/            # On server startup
.gitignore            # add to this gitignore for ignoring
bower.json            # add to this bower file or use bower install
*settings.json*       # Meteor.settings file -- you need to add this file (touch settings.json)
```

## To Do

-  SEO packages
-  Replace meteor-bower packages with custom packages to eliminate angular double-loading
-  Animations
-  Whatever else the people want

## License

The MIT License

Copyright (c) 2015 Glipcode http://glipcode.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.