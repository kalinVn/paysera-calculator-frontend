export default class Validator{
	
	
	validate(data, Obj){
		try {
			//Validate  is obj is instanceof Calculator , if Object is other instance we must create and call another function
			let isJson = JSON.stringify(data);
			if(Obj instanceof calc.Calculator ){
				this._validateCalculator(data)
			}
			
		} catch(e){
			console.error(e);
		}
	}
	
	_validateCalculator(data){
		data.forEach((element, ind) => {
			let keys = Object.keys(element);
			for(let i = 0; i < keys.length;i++){
				let key = keys[i];
				let value = element[key];
				let isValidete =  false;
				if(key != "operation"){
					isValidete = this._calculator(key, value);
					
				}else{
					let keyOperation = Object.keys(value);
						for(let j = 0; j < keyOperation.length; j++){
							let indKeyOperation = keyOperation[j];
							let valueKeyOperation = value[indKeyOperation];
							isValidete = this._calculator(indKeyOperation, valueKeyOperation);
							if(!isValidete){
								break;
							}
						}
					
				}
				if(!isValidete){
					let nomerTransaction = ind +1;
					throw "Json not valid field " + key + " ,transaction nomer: " +  nomerTransaction;
				}
			}
					
		});
	
	
	}
	
	_calculator(key, value) {
		let regex;
		switch (key){
			case "user_id":
				regex =  new RegExp('^[0-9]+$');
			break;
			case "user_type":
				regex =  new RegExp('^[a-zA-Z]+$');
			break;
			case "type":
				regex =  new RegExp('^[a-zA-Z_]+$');
			break;
			case "amount":
				if( !((value === parseFloat(value, 10)) && (value === parseInt(value, 10)) ) ){
					throw "Amount must be int or float type";
					return false;
				}
				regex =  new RegExp('^[0-9.]+$');
			break;
			case "currency":
				regex =  new RegExp('^[A-Z]+$');
				break
			case "date":
				regex =  new RegExp('^([0-9]{4})(-)((([0]{1})([0-9]{1}))|([1]{1})([0-2]{1}))(-)((([0-2]{1})([0-9]{1}))|([3]{1})([0-1]{1}))$');
			break;
			
			
		}
		return regex.test(value);
		
	}
	
}
	