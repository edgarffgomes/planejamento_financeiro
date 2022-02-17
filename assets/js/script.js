//Criação da variável para receber os itens de local stora com tipo String
var transRaw = localStorage.getItem('transaction')
if(transRaw == null){
	var transactionList = []
} else{
	var transactionList = JSON.parse(localStorage.getItem('transaction'))
}
calculaTotal()
drawTable()
//Função máscara para aceitar apenas caracteres específicos no campo value.
function mask(e){
	var pattern = /[0-9 .,]+/g
	if(pattern.test(e.key) == false){
		e.preventDefault()
	}
}

//função para validação de valores dos inputs.
function testInputs(e){
	e.preventDefault()
	var tt = document.getElementById('transaction-type').value
	var nm = document.getElementById('merch-name').value
	if(document.getElementById('value').value == ''){
		alert('Por favor, insira um valor para a transação!')
		document.getElementById('value').focus()
		return false
	} else {
			if(document.getElementById('value').value.indexOf(',') == -1){
				alert('Favor, adicionar a quantia em centavos!')
				document.getElementById('value').focus()
				return false
			}
		}
	var vl = document.getElementById('value').value.replace('.','').replace(',','.')
	if(nm == ''){
		alert('Por favor, insira um nome para a mercadoria')
		document.getElementById('merch-name').focus()
		return false
	}
		//criação do objeto literal que receberá os valores dos inputs para ser enviado para a lista
		var litObj = {
			type: tt,
			name: nm,
			value: vl,
		}

		transactionList.push(litObj)
		localStorage.setItem("transaction", JSON.stringify(transactionList))
		
		drawTable()

}

//Função para imprimir dados resgatados na tabela de transações
function drawTable(){

	//código para evitar repetição de elementos já impressos
	//transformando NodeList com elementos já impressos em vetor
	var currentLines = [...document.querySelectorAll('table.lista tbody .dynamic-row')];
	//removendo os elementos já impressos do vetor
	currentLines.forEach((element)=> {
		element.remove()
	})
	//inserindo elementos na barra de transações
	for(data in transactionList){
		document.querySelector('table.lista tbody').innerHTML += `
			<tr class="dynamic-row">
				<td colspan="1.5">${transactionList[data].type == 'compra' ? `-`:`+`}</td>
				<td>${transactionList[data].name}</td>
				<td>R$ ${transactionList[data].value}<br><button onclick="deleteData(data)">Excluir</button></td>
			</tr>
		`
	}
	if(transactionList.length == 0){
		document.querySelector('table.lista tbody').innerHTML += `
			<tr class="dynamic-row">
				<td colspan="1.5"></td>
				<td>Nenhuma transação cadastrada</td>
				<td></td>
			</tr>
		`
	}
	calculaTotal()
}
function deleteData(d){
	//removendo um elemento com o index d da lista
	transactionList.splice(d,1)
	//enviando lista atualizada para local storage
	localStorage.setItem('transaction', JSON.stringify(transactionList))
	//recalculando total
	calculaTotal()
	//redesenhando tabela atualizada
	drawTable()
}
//função para calcular o total
function calculaTotal(){
	//variável total recebendo 0 inicialmente
	var total = 0

	//verificando se há algum elemento na lista
	if(transactionList.length > 0){
		//somando ou subtraindo dependendo do tipo de transação
		for(data in transactionList){
			if(transactionList[data].type == 'venda'){
				total += parseFloat(transactionList[data].value)
			}
			else{
				total -= parseFloat(transactionList[data].value)
			}
		}
	}
	//atualizando o valor total na tabela
	document.querySelector('table.lista tr.total .value').innerHTML = `
		R$ ${total.toFixed(2).toString().replace('.', ',')}<br>${total>=0 ? '(LUCRO)': '(PREJUÍZO)'}
	`
}
function transactionLog(){
	document.getElementById('nav-selector').checked = false
	document.getElementById('merch-name').focus()
}
function cleanData(){
	while(transactionList.length){
		transactionList.pop()
	}
	localStorage.clear()
	document.getElementById('nav-selector').checked = false
	drawTable()
}