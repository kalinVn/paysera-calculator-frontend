# Calculator-frontend

	Class App  
		Validate json file with Validator class and Regex expresions.
		Get comissions array from Calculator class
		Render comissions array with Renderer class.

	Class Calculator 
		Method calculate (parameter data is array passed in App class)
		Declarate users object in constructor.
		Loop data array and for every one iteration  
			1. Check users object keys.If dont exist keys from users object with user_id value from json file  create
			new User class.If type is 'cash_out' transaction array from created Used class push operation key and date key from json data 
			aray.Else we have user from users object declareded befor with data json file key ans  transactions array push  operation value and date value.
			
			2.After these conditions  check if parameter type is "cash_in"  just
			call _calculateComission method in Calculator class.If parameter type is "cash_out"  calculate
			witch loop person transactions array given from calculate method and calculate difrent between days , number week in year ,execuded
			sum.Based on this characters comission is calculated.
		
	Class Validator 
    Validator validate method which use Regex expresions to validate field.
	If class is instance of Calculator.Validator call validate calculator method(Validator class must be validate many things not only Calculator)
	
	Class Renderer  
		Display, rounding and ceil array value comissions from given comissions array in App class from Calculator calculate method.If class is 
		instance of Calculator.Renderer call render calculator method(Renderer class must be render many things not only Calculator)
	
 
Test program 
npm run test

Run program
npm run start
