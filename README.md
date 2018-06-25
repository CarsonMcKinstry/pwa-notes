# PWA Notes

A simple example application, demonstrating the basics of how to turn a web application into a PWA.

Over the past month or so, I've been working on a project for work, coming up with the solution for our users who are in remote parts of the country side for a majority of their workday. Obviously, it's important for them to be able to do their job. Enter Progressive Web Apps

## What is a PWA?

[According to the team at Google](https://developers.google.com/web/progressive-web-apps/), a Progressive Web App (PWA) is a web application that takes advantage of some of the latest browser features in order to make an app that is **reliable**, **fast**, and **engaging**. 

  - **Reliable** - the app can and does load instantly, regardless of the user's connection
  - **Fast** - once the site is loaded, users expect it to be fast; this means smooth animations and "no janky scrolling [sic]"
  - **Engaging** - the app is installable on the user's home screen and offers a full screen experience when launched. Users can also be re-engaged with push notifications 

## But why?

The world is moving toward the web, for better or worse. To keep up with this shift, companies have been creating web applications, as opposed to native applications. <!-- TODO: need to come up with some examples --> PWAs make this possible. With the inclusion of a web manifest, some of the normal features you would expect from a native mobile app are possible in a PWA*. Your app can go fullscreen, it will for the most part, work offline, and you can even send your users push notifications. You also have access to a multitude of sensors and features that the device comes equipped with. 

Having a native, or native-like, application can increase your adoption rate. Google gives an example of [AliExpress](https://developers.google.com/web/showcase/2016/aliexpress), who saw

- 104% conversion rate across all browsers; 82% on iOS
- 2x more page visits 
- 74% increase in the amount of time spent on the site

These are pretty significant numbers in terms of conversion rates, and all of this was done with the help of PWAs.


> With the introduction of iOS 11.3, PWAs are supported on iPhones. However, the `manifest.json` implementation is still a little buggy, and there are still some features that don't currently work (i.e. Push Notifications, Background Sync). A lot of these issues, however, can be solved by using the [apple related link and meta tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) in your HTML file. Luckily, some of these features will be coming in future iOS updates. In general, however, PWAs will still work on iPhones and iPads.
> 
> As well, PWAs are not mobile applications. There is access to device features that are not available to PWAs. Here's a great list of features you have access to right now in your current browser: [What Can Web Do Today?](https://whatwebcando.today/) As time passes, this list will get better and better. 

## This is cool and all, but how?

*For these examples, we will be using [React](https://reactjs.org) where applicable.*

Hopefully you have a web application already. If you don't, make one. For what I'm showing off here, we are taking a mobile first approach to building a web app.

### Design

Step one is to make sure that your application looks good on mobile. In Chrome, you can open the developer console and fiddle with the screen dimensions of your browser window.

![Browser agent switch](./readme-assets/mobile-view.png)

This will also change the user agent of the browser, so you will see how the app behaves on different platforms. If it looks good, you should be fine. If not, get to making some [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) and making your application look good on mobile. Using a mobile first methodology to your designs helps with this process immensely. Most CSS frameworks nowadays work from this standpoint.

### Navigation

The next step is to make sure that your navigation still works in a headless browser. In `standalone` mode, your user won't have access to the normal toolbar bar. This means no URL input, no back buttons, and no refresh. What this means, is we need to give alternatives for navigating the app. This is true for mobile, tablet, and Chrome for desktop. Here are a few options:

- The Back Button™ - This is common in most apps on both iOS and Android
- Swipe navigation - This is also very common on most platforms. Swipe left, go forward; swipe right, go back.
- Menu navigation - Allows easy switching between different screens or views
- Many more!

Here's some examples of how I'm handling navigation in this app. Note: I use [`rmwc`](https://jamesmfriedman.github.io/rmwc/), a react binding of Google's Material Web Components.

#### The Back Button™

On iOS devices there is no physical back button, like on Android devices, so implementing a back button can solve this issue. Luckily, it is fairly straightforward to implement The key is to ensure that the front page your app doesn't have a back button. 

```javascript
...
import { 
  TopAppBar, 
  TopAppBarRow, 
  TopAppBarSection,
  TopAppBarFixedAdjust, 
  TopAppBarNavigationIcon 
} from 'rmwc/TopAppBar';
...

class Toolbar extends React.Component {
  
  ...
  needsBackButton = () => this.props.location.pathname !== '/';
  ...

  render() {
    return(
      <React.Fragment>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              {
                this.needsBackButton()
                ? <TopAppBarNavigationIcon 
                    use="arrow_back"
                    onClick={() => this.props.history.go(-1)}
                  />
                // placeholder for when the button isn't there
                : <BackPlaceholder/> 
              }
            </TopAppBarSection>
            ...
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>
      </React.Fragment>
    )
  }

}

```

#### Swipe Navigation

This uses the [`react-swipeable`](https://www.npmjs.com/package/react-swipeable) library. An integral part of navigation when you aren't on Android, is being able to swipe back and forth between views and pages. Here's one way to set up the navigation.

```javascript
...
import Swipeable from 'react-swipeable';
...

class SwipeableComponent extends React.Component {

  ...
  handleSwipedLeft = (evt, deltaX, isFlick) => {
    this.props.history.go(1);
  }

  handleSwipedRight = (evt, deltaX, isFlick) => {
    // this will prevent a right swipe from taking you out of the app
    if (this.props.location.url !== '/') {
      this.props.history.go(-1);
    }
  }
  ...

  render() {
    return (
      <Swipeable
        onSwipedLeft={this.handleSwipedLeft}
        onSwipedRight={this.handleSwipedRight}
      >
        ...
      </Swipeable>
    )
  }

}

```

<!-- TODO: Need to add the page switch animation here -->

#### Menu Navigation

For menu navigation, this should include the major relevant views, without overwhelming the user. If there are more than a few options, a hamburger menu might be more suited to your needs.

```javascript
...
import { 
  TopAppBar, 
  TopAppBarRow, 
  TopAppBarSection,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon 
} from 'rmwc/TopAppBar';
import {
  Menu,
  MenuItem,
  MenuAnchor,
} from 'rmwc/Menu';
import { Link } from 'react-router-dom';
...

class Toolbar extends React.Component {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState(prev => ({
      menuOpen: !prev.menuOpen
    }));
  }

  render() {
    return (
      <React.Fragment>
        <TopAppBar>
          <TopAppBarRow>
            ...
            <TopAppBarSection alignEnd>
              <MenuAnchor>
                <Menu
                  open={this.state.menuOpen}
                  onClose={this.toggleMenu}
                >
                  <Link to="/#"><MenuItem>Home</MenuItem></Link>
                  <Link to="/#"><MenuItem>Trash</MenuItem></Link>
                </Menu>

                <TopAppBarActionItem
                  use="more_vert"
                  onClick={this.toggleMenu}
                />
              </MenuAnchor>
            </TopAppBarSection>
            ...
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>
      </React.Fragment>
    )
  }
}
```

These aren't the be all, end all of navigation, but rather some common patterns. 

Throughout the examples above, you see reference to `this.props.history`. If you didn't already know, `history` is how your browser knows where you are in relation to the pages you've been to. 

For our app, we need fine grained control over our history. The reason for this, is that in `standalone` mode, you don't have access to the browser history, so instead, we lean on a hash history. To make this simple, we can use the [`history`](https://www.npmjs.com/package/history) library. We then use the base `Router` from `react-router`:

```javascript
...
import { createHashHistory, createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
...

// this is a decent way to check if you are in standalone mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches

const history = isStandalone
  // hash history is required for standalone mode
  ? createHashHistory()
  // Browser history for non standalone mode is fine
  : createBrowserHistory();

...

ReactDOM.render(
  <Router history={history}>
    <App/>
  </Router>,
  document.getElementById('root')
);
  
```

We now have our history. One of the problems we will run into though, is that when we close our app, it won't have any idea where we left off. Most native apps won't just return you to the home view, but rather let you continue where you left off, at least for a certain amount of time. We can mimic this without to much trouble:

```javascript

import moment from 'moment';

...
// first we need to figure out where our user should be
// we wrap this in an IIFE because we only need it once
( function returnToPage(history) {
  const locationString = localStorage.getItem('lastLocation');

  if (locationString) {
    // later we will show that we've attached an expiration.
    // this is totally optional, but can help if the user leaves
    // the app for long periods of time. Dropping in where you left off
    // two weeks ago might be a bit jarring
    const [ expiration, lastLocation ] = locationString.split('Z-');

    // if the last location hasn't expired, push it to the history stack
    if (moment().isBefore(expiration + 'Z') && isStandalone) {
      history.push(lastLocation);
    }
  }
})(history);

// next we need to set up how to save the history
history.listen((location, action) => {
  // set up our expiration
  const expiration = moment().add(10, 'minutes').toISOString();
  // set our last location into local storage
  localStorage.setItem(
    'lastLocation',
    `${expiration}-${location.pathname}`
  );
})
...

```

## The Web Manifest 

In traditional apps, and across most of computing, a manifest file contains meta data for the application you are distributing. This is no different in the web world, at least where PWAs are concerned.

Here's a sample `manifest.json` file:

```json

{
  "short_name": "PWA notes",
  "name": "Progress Web App Notes",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

This is a pretty simplistic manifest, and is what's included with `create-react-app`. Let's look at Twitter's:

```json
{
  "background_color": "#ffffff",
  "description": "It's what's happening. From breaking news and entertainment, sports and politics, to big events and everyday interests.",
  "display": "standalone",
  "gcm_sender_id": "49625052041",
  "gcm_user_visible_only": true,
  "icons": [
      {
          "src": "https://abs-0.twimg.com/responsive-web/web/ltr/icon-default.882fa4ccf6539401.png",
          "sizes": "192x192",
          "type": "image/png"
      },
      {
          "src": "https://abs-0.twimg.com/responsive-web/web/ltr/icon-default.882fa4ccf6539401.png",
          "sizes": "512x512",
          "type": "image/png"
      }
  ],
  "name": "Twitter Lite",
  "orientation": "portrait",
  "share_target": {
      "url_template": "compose/tweet?title={title}&text={text}&url={url}"
  },
  "short_name": "Twitter Lite",
  "start_url": "/",
  "theme_color": "#ffffff",
  "scope": "/"
}
```

> iOS is still a bit behind with manifest files. At present, manifest files are buggy, and the icons won't show. A lot of the reasoning behind this is that Apple has had non-standard <link/> and <meta/> tags. More information can be found in [Apple's Web Developer Documentation](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html). This information is somewhat outdated, but should work regardless of what is put into the manifest. Once manifest support is fully rolled out, if ever, this shouldn't be an issue.


## Let's go Offline

This is all fine and dandy, but if our app doesn't work, to an extent, while you're offline then we've defeated the purpose. At the time of writing these, we have a few methods for handling not having a connection. Let's go through them.

### Service Workers

This is the bread and butter of offline web applications. Service workers sit in between your application and the outside world, in essence controlling the network layer. This allows us to control how our application behaves when there isn't an internet connection. Things you can do with service workers:

- Caching files
- Caching network response
- BackgroundSync
- Push
- Notifications (not yet in iOS)

The service worker API can be cumbersome to work with, so Google created [Workbox](https://developers.google.com/web/tools/workbox/) which provides an easy to use interface for creating a service worker. Here's an example service worker:

```javascript
// we need to import the WorkBox scripts
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js'); 

// this manifest is normally generated by an outside tool such as Webpack
workbox.prechaching.precacheAndRoute(self.precacheManifset || []);

// here we register a route we want to do something with
workbox.routing.registerRoute(
  '/route/to/cache',
  // one of Workbox's 5 network strategies
  // See below
  workbox.strategies.networkFirst({
    cacheName: 'name-of-cache'
  });
);

// example sync handler
self.addEventListener('sync', (evt) => {
  alert(evt)
});

// example push handler
self.addEventListener('push', () => {
  alert(evt);
});

// example notification handler
self.addEventListener('notification', () => {
  alert(evt);
})

```

Workbox comes with 5 strategies for handling network requests

- Stale-While-Revalidate - serves from the cache directly, but attempts to update that cache in the background
- Cache First - serves from the cache directly, and falls back to the network if available
- Network First - serves from the network, and falls back to the cache if available
- Network Only - serves 100% from the network and will not fallback to the cache
- Cache only - serves 100% from the cache, in the event you have caching already set up

For More information about Service Workers:

- [Service Worker Api @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Intro to Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)
- [Workbox @ Google](https://developers.google.com/web/tools/workbox/)

### IndexedDB

IndexedDB is a client-side storage solution for large amounts of **structured** data, including files and blobs. First and foremost, IndexedDB is a transactional NoSQL database, which means we can interact with it in a similar fashion to MongoDB. 

Again we've run into an API that is a little more complex than we need, so we are going to use a wrapper that was written for interacting with IDB in a meaningful way. We're using [`Dexie`](https://www.dexie.org) in these examples, but there are plenty of others suggested by [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

```javascript
import Dexie from 'dexie';

// create our database interface
const db = new Dexie('my_database');

db
  // attach our version
  .version(1)
  // attach our stores
  .stores({
    // <store name>: <indexed schema>
    friends: '++id,name,age'
  });

// insert a friend into the store
db.friends.put({name: 'Carson', age: 24})
  // get the friend back out of the store
  .then(() => db.friends.get({name: 'Carson'}))
  // log the friend to the console
  .then(friend => {
    console.log(friend);
  })
  // catch any errors
  .catch(err => {
    console.error(err);
  });

```

The general flow of using Dexie is:

1. open an instance of a database
2. define the version and stores you are interacting with
3. read and write data to the database

If you ever need to create a new version of the database, Dexie provides an interface for upgrading all of the objects in your store.
 
> Different browsers have different storage limits and retention policies, so you need to be aware of this when you are building your database solution
> 
> - Chrome - per origin (app) up to 6% of the free disk space
> - FireFox - per origin (app) up to 10% of free disk space, but prompts after 50MB
> - Safari 
>   - Desktop - unlimited, but prompts after 5MB 
>   - Mobile - per origin (app) up to 50MB, **and clears after a time**
> - IE 10+ - per origin (app) up to 250mb, but prompts after 10MB
> - Edge - ???

*So, how do we see what's going on in the database once we've created it?*

Luckily, Chrome has been on top of this and introduced a tool inside of the `Application` tab in the dev console which gives you access to view and work with the documents that are currently stored in your app.

## Next Steps

Hopefully, this has given you a good intro into working with PWAs and a sliver of the technologies associated with it. While some aspects of PWAs are still in relative flux, a majority of the APIs and tools have stabilized, allowing us to start working with them today. The only thing we're waiting for is for individual implementations to go to production (I'm looking at you IE and Safari). 

For further reading, check out:

- [Progressive Web Apps @ Google](https://developers.google.com/web/progressive-web-apps/)
- [Progressive Web Apps on Wikipedia](https://en.wikipedia.org/wiki/Progressive_Web_Apps)

## Want to try out the demo?

To view the app without allowing service workers:

```
git clone https://github.com/CarsonMcKinstry/pwa-notes.git
cd pwa-notes
```
npm

```
npm install
npm start
```

yarn
```
yarn install
yarn start
```

To view the app in production, with full offline support: [react-pwa-notes.herokuapp.com](https://react-pwa-notes.herokuapp.com)