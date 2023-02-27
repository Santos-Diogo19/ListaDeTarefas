const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btntarefa')
const tarefa = document.querySelector('.tarefas')

function criaLI(){
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}



function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'apagar está tarefa')
    li.appendChild(botaoApagar)
}

function criaTarefa(textoInput){
    const li = criaLI()
    li.innerText = textoInput
    tarefa.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}


btnTarefa.addEventListener('click', ()=>{
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
    
})

document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas(){
    const liTarefas = tarefa.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefas of liTarefas){
        let tarefaTexto = tarefas.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
        
    
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    console.log(listaDeTarefas)

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()
