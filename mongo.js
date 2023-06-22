const { MongoClient } = require('mongodb');

// Define the Politician class
class Politician {
  constructor(name, votes, money) {
    this.name = name;
    this.votes = votes;
    this.money = money;
  }
}

// Define the Party class
class Party {
  constructor(collection) {
    this.collection = collection;
  }

  async createPolitician(politician) {
    await this.collection.insertOne(politician);
  }

  async readPoliticians() {
    const politicians = await this.collection.find().toArray();
    return politicians;
  }

  async updatePolitician(name, updates) {
    await this.collection.updateOne({ name }, { $set: updates });
  }

  async deletePolitician(name) {
    await this.collection.deleteOne({ name });
  }
}

async function main() {
  const uri = 'mongodb+srv://niyanthrirsbsc22:KND71415@cluster0.zh34svf.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('politician');
    const politiciansCollection = database.collection('votes');

    const party = new Party(politiciansCollection);

    // Create politicians
    const politician1 = new Politician('Mia', 50, 100);
    await party.createPolitician(politician1);
    await party.createPolitician(new Politician('Ria', 20, 200));
    await party.createPolitician(new Politician('Lia', 30, 300));
    await party.createPolitician(new Politician('Sia', 40, 250));

    // Read all politicians
    const allPoliticians = await party.readPoliticians();
    console.log('All Politicians:', allPoliticians);

    // Update a politician
    const updates = { votes: 1500, money: 75000 };
    await party.updatePolitician('Mia', updates);

    // Read all politicians after the update
    const updatedPoliticians = await party.readPoliticians();
    console.log('Updated Politicians:', updatedPoliticians);

    // Delete a politician
    await party.deletePolitician('Mia');

    // Read all politicians after the deletion
    const remainingPoliticians = await party.readPoliticians();
    console.log('Remaining Politicians:', remainingPoliticians);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

main();
