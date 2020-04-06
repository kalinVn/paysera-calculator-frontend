	
	class User {
		constructor(id, type){
			this.id = id;
			this.type = type;
			this.transactions = [];
		}
		
		addTransaction(operation){
			this.transactions.push(operation);
		}

	}
	module.exports = User;
	