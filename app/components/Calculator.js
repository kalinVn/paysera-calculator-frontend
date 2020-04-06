	const FREE_SUM_CHARGE = 1000;

	class Calculator {
		constructor(json){
			this.users = {};
			this.format = 2;
			
		}
		
		_weekOfYear(string) {
			let date = new Date(string);
			var target = new Date(date.valueOf()),
            dayNumber = (date.getUTCDay() + 6) % 7,
            firstThursday;
			target.setUTCDate(target.getUTCDate() - dayNumber + 3);
			firstThursday = target.valueOf();
			target.setUTCMonth(0, 1);
			if (target.getUTCDay() !== 4) {
				target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
			}
			return Math.ceil((firstThursday - target) /  (7 * 24 * 3600 * 1000)) + 1;
		}


		_diffDays(string1, string2){
			let date1 = new Date( string1);
			let date2 = new Date( string2 );
			let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
			return Math.abs(diffDays);
		}

		calculate(data){
			let comissions = [];
			data.forEach(
				(element, index) => {
					let comission;
					let date = element.date,
					user_id = element.user_id,
					user_type = element.user_type,
					type = element.type;
					let user;
					let operation = {
						amount : element.operation.amount,
						currency : element.operation.currency
					}
					operation.date = date;
					if(!this.users[user_id]){
						user = new calc.User(user_id, user_type);
						this.users[user_id] = user;
					}else{
						user = this.users[user_id];
					}
					if( type == "cash_in" ){
						operation.maxSum = 5;
						operation.minSum = 0;
						operation.percent = 0.03;
						comission = this._calculateComission(operation);
						
					}else {
						if(user.type == 'juridical'){
							operation.maxSum = 0;
							operation.minSum = 0,50;
							operation.percent = 0.3;
							comission = this._calculateComission(operation);
						}else {
							user.transactions.push(operation);
							let operationPerWeek = 0,
							sumWeek = 0,
							execuded = false;
							user.transactions.forEach((transaction, key) => {
								if( key < user.transactions.length -1 ){
									let lastDate = user.transactions[user.transactions.length -1].date;
									let currentDate = transaction.date;
									let diffDays = this._diffDays(currentDate, lastDate);
									let lastDateNumberOfYear = this._weekOfYear(currentDate);
									let currentDateNumberOfYear = this._weekOfYear(lastDate);
									let diffWeek = Math.abs(lastDateNumberOfYear - currentDateNumberOfYear);
									if(diffWeek == 0 && diffDays <= 7){
										operationPerWeek++;
										sumWeek += transaction.amount;
										if(sumWeek > FREE_SUM_CHARGE){
											execuded = true;
										
										}
									}
								
								}else {
									sumWeek += transaction.amount; 
									let operations = {};
									operations.amount = Math.abs(transaction.amount - FREE_SUM_CHARGE)
									if(sumWeek <= FREE_SUM_CHARGE){
										execuded = false;
										operations.amount = operationPerWeek <= 3 ? 0 : transaction.amount;
										execuded = operationPerWeek <= 3 ? false : true;
									}
									else if(sumWeek > FREE_SUM_CHARGE){
										operations.amount = execuded ? transaction.amount : sumWeek - FREE_SUM_CHARGE;
										execuded = true;
									}
									operations.percent = 0.3;
									operations.maxSum = 0;
									operations.minSum = 0;
									comission =  this._calculateComission(operations);
								}
							});
						}
					}
					comissions.push(comission);
				}
			);
			return comissions;
		}
		
		
		_calculateComission(operation){
			let maxSum = operation.maxSum;
			let minSum = operation.minSum;
			let percent = operation.percent;
			let amount = operation.amount;
			let comission;
			if(maxSum > 0){
				comission = (percent/100 ) * amount > maxSum  ? maxSum : (percent/100 ) * amount;
			}else if(minSum > 0){
				comission = (percent/100 ) * amount < minSum ? minSum : (percent/100 ) * amount;
			}else {
				comission = (percent/100 ) * amount;
			}
			return comission;
		
		}
		

	}
	module.exports = Calculator;