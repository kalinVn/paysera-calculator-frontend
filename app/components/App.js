	
	class App{
		init(data){
			let Calculator = new calc.Calculator();
			let Validator = new calc.Validator();
			Validator.validate(data, Calculator);
			let comissions = Calculator.calculate(data, Calculator);
			calc.Renderer.render(comissions, Calculator);
		
		}

	}
	module.exports = App;