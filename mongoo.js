const mongoose = require('mongoose');

// Define the Politician schema
const politicianSchema = new mongoose.Schema({
  name: String,
  votes: Number,
  money: Number,
});

// Define the Politician model
const Politician = mongoose.model('Politician', politicianSchema);

// Define the Party class
class Party {
  constructor() {}

  async createPolitician(politician) {
    await politician.save();
  }

  async readPoliticians() {
    const politicians = await Politician.find();
    return politicians;
  }

  async updatePolitician(name, updates) {
    await Politician.findOneAndUpdate({ name }, updates);
  }

  async deletePolitician(name) {
    await Politician.findOneAndDelete({ name });
  }
}

async function main() {
  try {
    await mongoose.connect('mongodb+srv://niyanthrirsbsc22:KND71415@cluster0.zh34svf.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const party = new Party();

    // Create politicians
    const politician1 = new Politician({ name: 'Mia', votes: 50, money: 100 });
    await party.createPolitician(politician1);
    await party.createPolitician(new Politician({ name: 'Ria', votes: 20, money: 200 }));
    await party.createPolitician(new Politician({ name: 'Lia', votes: 30, money: 300 }));
    await party.createPolitician(new Politician({ name: 'Sia', votes: 40, money: 250 }));

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
    await mongoose.disconnect();
  }
}

main();
