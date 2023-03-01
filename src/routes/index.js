const assignRoutes = (app) => {
    app.use('/admin', require('../routes/adminRoutes')),
    app.use('/merchant', require('../routes/merchantRoutes'));
    //app.use('/users', require('../routes/userRoutes'));
}

module.exports = assignRoutes  