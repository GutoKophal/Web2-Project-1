(async () => {
  const { sequelize } = require('../database/database')
  
  require('./user')
  require('./category')
  require('./ticket')
  require('./status')
  
  await sequelize.sync()
})();
