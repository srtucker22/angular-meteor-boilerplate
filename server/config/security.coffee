BrowserPolicy.content.allowEval()

BrowserPolicy.content.allowOriginForAll '*.googleapis.com'
BrowserPolicy.content.allowOriginForAll '*.gstatic.com'
BrowserPolicy.content.allowOriginForAll '*.bootstrapcdn.com'
BrowserPolicy.content.allowOriginForAll '*.semantic-ui.com'

BrowserPolicy.content.allowOriginForAll '*.google-analytics.com'
BrowserPolicy.content.allowOriginForAll '*.stats.g.doubleclick.net'

BrowserPolicy.content.allowFontDataUrl()

# for facebook
BrowserPolicy.content.allowScriptOrigin '*.connect.facebook.net'
BrowserPolicy.content.allowFrameOrigin 'static.ak.facebook.com'
BrowserPolicy.content.allowFrameOrigin '*.facebook.com'
BrowserPolicy.content.allowFrameOrigin 's-static.ak.facebook.com'

# for twitter
BrowserPolicy.content.allowOriginForAll 'platform.twitter.com'
BrowserPolicy.content.allowOriginForAll 'syndication.twitter.com'