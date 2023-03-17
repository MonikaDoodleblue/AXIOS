const assignRoutes = (app) => {
    app.use('/admin', require('../routes/adminRoutes'))
}

module.exports = assignRoutes  