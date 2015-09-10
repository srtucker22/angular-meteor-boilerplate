//creating a global server logger
log = Winston;

log.add( Winston_Papertrail, {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    auth: 4
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'red',
    error: 'red',
    auth: 'red'
  },

  host: 'logs2.papertrailapp.com',
  port: Meteor.settings.papertrail.port, 
  handleExceptions: true,
  json: true,
  colorize: true,
  logFormat: function(level, message) {
    return level + ': ' + message;
  }
});

log.info(' =====> Meteor App restarted '+ new Date( Date.now()) +' <=====');
