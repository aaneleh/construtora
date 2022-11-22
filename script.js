const canvasEl = document.getElementById('canvas');
const canvas = canvasEl.getContext("2d");
const width = canvasEl.getAttribute('width');
const height = canvasEl.getAttribute('height');

//valores default
let comprimento = 100, largura = 100, fileiras = 5, modelo = 'poli';

const desenhar = (comprimento, largura, fileiras, modelo) => {

    canvas.fillStyle = '#fff';
    canvas.fillRect(0,0, width, height);

    // Quantos metros equivale 1px para aproveitar da melhor maneira o espaço?
    // Exemplo: Se o canvas tem 600px de largura, e o usuário insere um máximo de 100m, cada pixel equivalerá 6px, então uma quadra de 20m será um retangulo de 120px;
    let equi = comprimento > largura ? width / comprimento : width / largura;

    //Demarca a área dada
    canvas.fillStyle = '#f5f5f5';
    canvas.fillRect(width/2 - ((comprimento*equi)/2), height/2 -((largura*equi)/2), comprimento*equi, largura*equi);

    //Desenhar a quadra de acordo com seu modelo
    let quadra_comprimento, quadra_largura;
    let quadra_espacamento = 6*equi;
    switch(modelo){
        case 'volei':
            quadra_comprimento = 18*equi, quadra_largura = 9*equi; 
            break;
        case 'basquete':
            quadra_comprimento = 28*equi, quadra_largura = 15*equi;
            break;
        case 'futsal':
            quadra_comprimento = 40*equi, quadra_largura = 20*equi;

            break;
        case 'poli':
            quadra_comprimento = 27*equi, quadra_largura = 16*equi;
            break;
    }
    let quadra_total_comprimento = quadra_comprimento+quadra_espacamento,
        quadra_total_largura = quadra_largura+quadra_espacamento;

    canvas.fillStyle = '#c2c2c2';
    canvas.fillRect(width/2 - ( (quadra_total_comprimento)/2), height/2 - ( (quadra_total_largura) /2), quadra_total_comprimento, quadra_total_largura);
    canvas.fillStyle = '#7aff70';
    canvas.fillRect(width/2 - quadra_comprimento/2, height/2 - quadra_largura/2, quadra_comprimento, quadra_largura);

    //Calcular cadeiras
    let cadeira_tamanho = 1.5 * equi;
    let cadeira_espaco_min = 3 * equi;

    //quantas cadeiras cabem no comprimento da quadra?
    let quant_cadeiras_horz = Math.floor( (quadra_total_comprimento) / (cadeira_espaco_min));

    //quanto deveria ser o espaço para cobrir todo o comprimento?
    let cadeira_espaco_1 = (quadra_total_comprimento) / quant_cadeiras_horz;

    //quantas fileiras cabem no máximo no espaço?
    let fileiras_max_vert = Math.floor(((largura*equi) - quadra_total_largura) / (cadeira_espaco_1*2));

    //o nº de fileiras passadas exece a quantidade máxima?
    let fileiras_vert = fileiras > fileiras_max_vert ? fileiras_max_vert : fileiras;


    //quantas cadeiras cabem na largura da quadra + as fileiras superiores e inferiores?
    let quant_cadeiras_vert = Math.floor( (quadra_total_largura + ( (cadeira_espaco_1*fileiras_vert)*2) ) / (cadeira_espaco_min) );
    
    //quanto deveria ser o espaço para cobrir todo o comprimento?
    let cadeira_espaco_2 = (quadra_total_largura + ( (cadeira_espaco_1*fileiras_vert)*2)) / quant_cadeiras_vert;

    //quantas fileiras cabem realmente no comprimento maxima?
    let fileiras_max_horz = ((comprimento*equi) - quadra_total_comprimento) / (cadeira_espaco_2*2);

    //o nº de fileiras passadas exece a quantidade máxima?
    let fileiras_horz = fileiras > fileiras_max_horz ? fileiras_max_horz : fileiras;

    //Desenhar cadeiras
    for(i = 0; i < fileiras_vert; i++){
        for(j = 0; j < quant_cadeiras_horz; j++){
            //Parte de cima
            canvas.fillStyle = '#fff';
            canvas.fillRect(width/2 - (quadra_total_comprimento)/2 + (j*cadeira_espaco_1), height/2 - ((quadra_total_largura)/2) - cadeira_espaco_1 - (i*cadeira_espaco_1), cadeira_espaco_1, cadeira_espaco_1);
            canvas.fillStyle = 'red';
            canvas.fillRect(width/2 - (quadra_total_comprimento)/2 + (cadeira_tamanho/2) + (j*cadeira_espaco_1), height/2 - ((quadra_total_largura)/2) - cadeira_espaco_1 + (cadeira_tamanho/2) - (i*cadeira_espaco_1), cadeira_tamanho, cadeira_tamanho);
            
            //Parte de baixo
            canvas.fillStyle = '#fff';
            canvas.fillRect(width/2 - (quadra_total_comprimento)/2 + (j*cadeira_espaco_1), height/2 + ((quadra_total_largura)/2) + (i*cadeira_espaco_1), cadeira_espaco_1, cadeira_espaco_1);
            canvas.fillStyle = 'red';
            canvas.fillRect(width/2 - (quadra_total_comprimento)/2 + (cadeira_tamanho/2) + (j*cadeira_espaco_1), height/2 + ((quadra_total_largura)/2) + (cadeira_tamanho/2) + (i*cadeira_espaco_1), cadeira_tamanho, cadeira_tamanho);
        }

    }
    for(i = 0; i < fileiras_horz; i++){
        for(j = 0; j < quant_cadeiras_vert; j++){
            //Parte da esquerda
            canvas.fillStyle = '#fff';
            canvas.fillRect(width/2 - ((quadra_total_comprimento)/2) - cadeira_espaco_1 - (i*cadeira_espaco_1) , height/2 - ((quadra_total_largura)/2) - (cadeira_espaco_1*fileiras_vert) + (cadeira_espaco_2*j), cadeira_espaco_2, cadeira_espaco_2);
            canvas.fillStyle = 'red';
            canvas.fillRect(width/2 - ((quadra_total_comprimento)/2) - cadeira_espaco_1 - (i*cadeira_espaco_1) + (cadeira_tamanho/2) , height/2 - ((quadra_total_largura)/2) - (cadeira_espaco_1*fileiras_vert) + (cadeira_espaco_2*j) + (cadeira_tamanho/2), cadeira_tamanho, cadeira_tamanho);
            
            //Parte da direita
            canvas.fillStyle = '#fff';
            canvas.fillRect(width/2 + ((quadra_total_comprimento)/2) + (i*cadeira_espaco_1), height/2 - ((quadra_total_largura)/2) - (cadeira_espaco_1*fileiras_vert) + (cadeira_espaco_2*j), cadeira_espaco_2, cadeira_espaco_2);
            canvas.fillStyle = 'red';            
            canvas.fillRect(width/2 + ((quadra_total_comprimento)/2) + (i*cadeira_espaco_1) + (cadeira_tamanho/2), height/2 - ((quadra_total_largura)/2) - (cadeira_espaco_1*fileiras_vert) + (cadeira_espaco_2*j) + (cadeira_tamanho/2), cadeira_tamanho, cadeira_tamanho);
        }
    }





}


//usa a função ao iniciar
window.onload = () => {
    desenhar(comprimento, largura, fileiras, modelo)
}

//pega valores digitados pelo usuario
document.getElementById('atualizar').addEventListener('click', () => {
    comprimentoInput = document.getElementById('horizontal').value == '' ? comprimento : document.getElementById('horizontal').value;
    larguraInput = document.getElementById('vertical').value == '' ? largura : document.getElementById('vertical').value;
    fileirasInput = document.getElementById('fileiras').value == '' ? fileiras : document.getElementById('fileiras').value;
    modeloInput = document.querySelector('.modelo_quadra:checked').value;

    desenhar(comprimentoInput,larguraInput,fileirasInput,modeloInput);
})