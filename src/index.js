const express = require('express');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware} = require('http-proxy-middleware');

const {ServerConfig,  Logger} = require('./config');

const apiRoutes = require('./routes');
const { config } = require('dotenv');
const serverConfig = require('./config/server-config');

const app = express();

const limiter = rateLimit({
    windowMs: 2*60*1000, // 3 minutes
    max: 30, // limit each IP to 3 requests per 'window' (here, per 2 minutes)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(limiter);

app.use('/flightsService',createProxyMiddleware({
    target:serverConfig.FLIGHT_SERVICE, 
    changeOrigin:true,
    pathRewrite: {'^/flightsService' : '/'}}));
app.use('/bookingService',createProxyMiddleware({
    target:serverConfig.BOOKING_SERVICE, 
    changeOrigin:true, 
    pathRewrite: {'^/bookingService' : '/'}}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,() =>{
    console.log(`succesfully started the server ${serverConfig.PORT}`);
});