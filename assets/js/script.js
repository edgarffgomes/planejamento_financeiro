function mask(e){
	var pattern = /[0-9 .,]+/g
	if(pattern.test(e.key) == false){
		e.preventDefault()
	}
}
function testInputs(e){
	e.preventDefault()
	var tt = document.getElementById('transaction-type').value
	var nm = document.getElementById('merch-name').value
	var vl = document.getElementById('value').value.replace('.','').replace(',','.')
	console.log(tt,nm,vl)
	if(nm == ''){
		alert('Por favor, insira um nome para a mercadoria')
		document.getElementById('merch-name').focus()
		return false
	}
	
	if(vl == ''){
		alert('Por favor, insira um valor para a transação!')
		document.getElementById('value').focus()
		return false
	} else {
			if(vl.indexOf('.') == -1){
				alert('Favor, adicionar a quantia em centavos!')
				document.getElementById('value').focus()
				return false
			}
		}
}