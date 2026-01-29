const { sequelize } = require('../config/database');
const fs = require('fs');
const path = require('path');

const runMigration = async () => {
  try {
    console.log('🔄 Running database migration...');
    
    const sqlPath = path.join(__dirname, 'migrations', '001_initial_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await sequelize.query(sql);
    
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();