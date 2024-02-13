// const $ = (query:string): HTMLInputElement | null => document.querySelector(query)
function $(query) {
    return document.querySelector(query);
}
function cadastrarVeiculo() {
    var _a, _b;
    let nome = (_a = $('#txtNome')) === null || _a === void 0 ? void 0 : _a.value;
    let placa = (_b = $('#txtPlaca')) === null || _b === void 0 ? void 0 : _b.value;
    if (!nome || !placa) {
        alert('Os campos nome e placa são obrigatórios');
        return;
    }
    adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
}
// Função que adiciona veiculos
function adicionar(veiculo, salva) {
    var _a, _b;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td>
            <button class="delete" data-placa="${veiculo.placa}">X</button>
        </td>
    `;
    (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        remover(this.dataset.placa);
    });
    (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
    if (salva)
        salvar([...ler(), veiculo]);
}
//Le os que já existem
function ler() {
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
}
//Salva
function salvar(veiculos) {
    localStorage.setItem('patio', JSON.stringify(veiculos));
}
function render() {
    // console.log('oi');
    $('#patio').innerHTML = '';
    const patio = ler();
    if (patio.length > 1) {
        patio.forEach((veiculo) => adicionar(veiculo, false));
    }
}
function remover(placa) {
    const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
    const tempo = calculaTempo(new Date().getTime() - new Date(entrada).getTime());
    if (!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
        return;
    salvar(ler().filter((veiculo) => veiculo.placa !== placa));
    render();
}
function calculaTempo(mil) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);
    return `${min}m e ${sec}s`;
}
