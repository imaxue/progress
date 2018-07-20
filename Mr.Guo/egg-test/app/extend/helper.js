const moment = require('moment');

exports.relative = time => moment(new Data(time * 1000)).fromNow();