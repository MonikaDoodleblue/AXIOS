const cron = require('node-cron');
const statusModel = require('../models/statusModel');

async function generateCron(id, otp) {
  const task = cron.schedule('*/10 * * * * *', async () => {
    console.log("222");

    await statusModel.query().insert({
      order_id: id,
      status: "orderPlaced"
    })
    await statusModel.query().insert({ 
      order_id: id,
      status: "orderShipped"
    })
    await statusModel.query().insert({
      order_id: id,
      status: "reachedLocalHub"
    })
    task.stop();
  },
    {
      scheduled: true,
      timezone: 'Asia/Kolkata'
    });
}

module.exports = { generateCron };