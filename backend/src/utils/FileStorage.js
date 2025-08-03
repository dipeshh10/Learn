const fs = require('fs').promises;
const path = require('path');

class FileStorage {
  constructor() {
    this.dataDir = path.join(__dirname, '..', 'data');
    this.ensureDataDir();
  }

  async ensureDataDir() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      console.error('Error creating data directory:', error);
    }
  }

  async saveData(collection, data) {
    try {
      const filePath = path.join(this.dataDir, `${collection}.json`);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Saved ${data.length} ${collection} to file`);
    } catch (error) {
      console.error(`❌ Error saving ${collection}:`, error);
    }
  }

  async loadData(collection) {
    try {
      const filePath = path.join(this.dataDir, `${collection}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      const parsed = JSON.parse(data);
      console.log(`✅ Loaded ${parsed.length} ${collection} from file`);
      return parsed;
    } catch (error) {
      console.log(`📁 No existing ${collection} file, starting fresh`);
      return [];
    }
  }

  async saveAllData(fallbackData) {
    const promises = Object.keys(fallbackData).map(collection => 
      this.saveData(collection, fallbackData[collection])
    );
    await Promise.all(promises);
  }

  async loadAllData() {
    const collections = ['students', 'routines', 'reports', 'fees', 'attendance', 'learningMaterials', 'courses', 'users'];
    const data = {};
    
    for (const collection of collections) {
      data[collection] = await this.loadData(collection);
    }
    
    return data;
  }
}

module.exports = FileStorage;
