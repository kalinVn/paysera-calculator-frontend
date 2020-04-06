global.calc = global.calc || {};
let User = require("../app/components/User.js");
calc.User =  User;
let TestCalculator = require("../app/components/Calculator.js");
let calculator = new TestCalculator();
let chai = require("chai");
let sinon = require("sinon");
let expect = chai.expect;
describe('Test Calculator', function() {
	it("Test _weekOfYear method -week of year between transactions" , function(){
		let date = '2020-01-03';
		expect(calculator._weekOfYear(date)).to.be.equal(1);
	});
	
	it("Test the _diffDays method - diffrent between days in transactions" , function(){
		let date1 = '2020-04-06'; 
		let date2 = '2020-04-08';
		expect(calculator._diffDays(date1, date2)).to.be.equal(2);
	});
	
	it("Test the _calculateComission method " , function(){
		let operation = {
			maxSum : 0,
			minSum : 0.50,
			percent : 0.3,
			amount : 300,
			currency : "EUR"
			
		
		}
		expect(calculator._calculateComission(operation)).to.be.equal(0.90);
	});
	
	it("Test the calculate method " , function(){
		let data =[
			{ 
			"date": "2016-01-05",
			"user_id": 1, 
			"user_type": "natural", 
			"type": "cash_in", 
			"operation": { "amount": 200.00, "currency": "EUR" }
			}
		]
		expect(calculator.calculate(data)).to.eql([0.06]);
	})
	
  
});


