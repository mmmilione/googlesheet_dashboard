const express = require('express');
const cookieParser = require('cookie-parser');
const getData = require('../controllers/data.js');
const changePW = require('../controllers/password');
const recover = require('../controllers/recover');
const users = require('../controllers/users.js');
const mw = require('../mw/auth');
const auth = require('../controllers/auth.js');

const router = express.Router();
router.use(cookieParser());

router.use('/assets', express.static('assets'));
router.get('/', (req, res) => res.render('index'));
router.get('/recover', (req, res) => res.render('recover'));
router.get('/NoAccess', (req, res) => res.render('noAccess'));
router.get('/dashboard', mw.checkAuth, mw.checkPW, getData);
router.get('/users', mw.isAdmin, users.list);
router.get('/changePW', mw.checkAuth, (req, res) => res.render('changePW', { hasChangedPW: req.user.hasChangedPW, isAdmin: req.user.isAdmin }));
router.get('/newUser', mw.isAdmin, (req, res) => res.render('newUser', {isAdmin: req.user.isAdmin}));
router.post('/api/auth', auth.login);
router.post('/api/recover', recover);
router.post('/api/logout', mw.checkAuth, auth.logout);
router.post('/api/changePW', mw.checkAuth, changePW);
router.post('/api/extend', mw.isAdmin, users.extend);
router.post('/api/addUser', mw.isAdmin, users.addUser);
router.delete('/api/deleteUser', mw.isAdmin, users.deleteUser);

router.get('*', (req, res) => res.render('index'));

module.exports = router;