const assignRoutes = (app) => {
    app.use('/admin', require('../routes/adminRoutes')),
    app.use('/merchant', require('../routes/merchantRoutes'));
    app.use('/user', require('../routes/userRoutes'));
    app.use('/delivery', require('../routes/deliveryRoutes'));
}

module.exports = assignRoutes  