const prompt = require('prompt-sync')();
class Politician {
    constructor(id, name, votes, money) {
      this.id = id;
      this.name = name;
      this.votes = votes;
      this.money = money;
    }
  }
  
  class Party {
    constructor() {
      this.politicians = [];
    }
  
    addPolitician(politician) {
      this.politicians.push(politician);
    }
  
    findPoliticianWithMaxVotes() {
      let maxVotes = 0;
      let maxPolitician = null;
  
      for (const politician of this.politicians) {
        if (politician.votes > maxVotes) {
          maxVotes = politician.votes;
          maxPolitician = politician;
        }
      }
  
      return maxPolitician;
    }
  
    findPoliticianWithMaxMoney() {
      let maxMoney = 0;
      let maxPolitician = null;
  
      for (const politician of this.politicians) {
        if (politician.money > maxMoney) {
          maxMoney = politician.money;
          maxPolitician = politician;
        }
      }
  
      return maxPolitician;
    }
  }
  
  function main() {
    const party = new Party();
  
    const politicianCount = parseInt(prompt("Enter the number of politicians:"));
  
    for (let i = 0; i < politicianCount; i++) {
      const id = i + 1;
      const name = prompt(`Enter the name of politician ${id}:`);
      const votes = parseInt(prompt(`Enter the number of votes for politician ${id}:`));
      const money = parseInt(prompt(`Enter the amount of money for politician ${id}:`));
  
      const politician = new Politician(id, name, votes, money);
      party.addPolitician(politician);
    }
  
    const politicianWithMaxVotes = party.findPoliticianWithMaxVotes();
    const politicianWithMaxMoney = party.findPoliticianWithMaxMoney();
  
    console.log("Politician with maximum votes:", politicianWithMaxVotes.name);
    console.log("Politician with maximum money:", politicianWithMaxMoney.name);
  }
  
  main();
  