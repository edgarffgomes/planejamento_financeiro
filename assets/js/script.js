//Criação da variável para receber os itens de local stora com tipo String
var transRaw = localStorage.getItem('transaction')
if(transRaw == null){
	var transactionList = []
} else{
	var transactionList = JSON.parse(localStorage.getItem('transaction'))
}
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
	var vl = document.getElementById('value').value.replace('.','').replace(',','.')
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

		//criação do objeto literal que receberá os valores dos inputs para ser enviado para a lista
		var litObj = {
			type: tt,
			name: nm,
			value: vl,
		}
	
		transactionList.push(litObj)
		console.log(transactionList)
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
}
function deleteData(d){
	//removendo um elemento com o index d da lista
	transactionList.splice(d,1)
	//enviando lista atualizada para local storage
	localStorage.setItem('transaction', JSON.stringify(transactionList))
	//redesenhando tabela atualizada
	drawTable()
}