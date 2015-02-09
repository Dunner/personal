// lib/routes.js

'use strict';
var middleware = require('./middleware'),
    index = require('./controllers/index'),
    session = require('./controllers/session'),
    feeds = require('./controllers/feeds'),
    posts = require('./controllers/posts');

module.exports = function(app) {
  // Server API Routes
  // -------
  // Feeds
  // -------
  app.get('/api/feeds', feeds.query);
  app.get('/api/feeds/:slug', feeds.show);
  app.post('/api/feeds/:slug', feeds.create);
  // -------
  // Session
  // -------
  app.get('/api/session', session.start); // START
  app.post('/api/session', session.login); // LOGIN
  app.delete('/api/session', session.logout); // LOGOUT
  // -------
  // Posts
  // -------
  app.param('postId', posts.post);
  app.get('/api/posts/:feedId', posts.query);
  app.get('/api/posts/:feedId/:postId', posts.show);
  app.post('/api/posts', middleware.auth, posts.create);
  app.put('/api/posts/:postId', middleware.auth, posts.update);
  app.delete('/api/posts/:postId', middleware.auth, posts.remove);


  // -------
  // Other
  // -------
  // 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // -------
  // Protected
  // -------
  app.get('/user', middleware.auth);
  app.get('/users', middleware.auth);
  app.get('/settings', middleware.auth);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/views/*', index.views);
  app.get('/*', index.index);
};