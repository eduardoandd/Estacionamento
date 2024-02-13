// const $ = (query:string): HTMLInputElement | null => document.querySelector(query)

interface Veiculo{
    nome:string
    placa:string
    entrada:Date | string
}

function $ (query:string): HTMLInputElement | null{
    return document.querySelector(query)
}

function cadastrarVeiculo(){
    let nome = $('#txtNome')?.value
    let placa = $('#txtPlaca')?.value
    
    if(!nome || !placa){
        alert('Os campos nome e placa são obrigatórios')
        return
    }
    adicionar({nome,placa,entrada: new Date().toISOString()}, true)
    
}

// Função que adiciona veiculos
function adicionar(veiculo:Veiculo, salva:boolean){
    const row = document.createElement('tr')

    row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td>
            <button class="delete" data-placa="${veiculo.placa}">X</button>
        </td>
    `

    row.querySelector('.delete')?.addEventListener('click', function(){
        remover(this.dataset.placa)
    })

    $('#patio')?.appendChild(row)

    if(salva) salvar([...ler(),veiculo])
    
}

//Le os que já existem
function ler(): Veiculo[]{
    return localStorage.patio? JSON.parse(localStorage.patio) : []
}

//Salva
function salvar(veiculos: Veiculo[]){
    localStorage.setItem('patio', JSON.stringify(veiculos))
}

function render(){
    // console.log('oi');
    
    $('#patio')!.innerHTML=''
    const patio = ler()

    if(patio.length > 1){
        patio.forEach((veiculo) => adicionar(veiculo,false));
    }
}

function remover(placa:string){
    const {entrada,nome} = ler().find(veiculo => veiculo.placa === placa)

    const tempo = calculaTempo(new Date().getTime() - new Date(entrada).getTime())

    if(!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return

    salvar(ler().filter((veiculo) => veiculo.placa !== placa))
    render()

}

function calculaTempo(mil: number):string {
    const min= Math.floor(mil / 60000)
    const sec = Math.floor((mil % 60000) / 1000)

    return `${min}m e ${sec}s`
}


