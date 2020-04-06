export default class Renderer{
	
	static render(model, Obj){
		if(Obj instanceof calc.Calculator ){
			this._calculator(model, Obj.format);
		}
	}
	
	static _calculator(model, format){
		model.forEach((element) => {
			console.log(element.toFixed(format));
		});
	
	}
}
	