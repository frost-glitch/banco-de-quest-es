let questAtual = 0;
let historico = [];
let qAcertos = 0;
let qErros = 0;
const botaoProx = document.querySelector("#proximo");

let questoes = [];
async function carregarQuestoes() {
    try {
        const resposta = await fetch('questoes.json');
        questoes = await resposta.json();
        mostrarQuestao();
        
    } catch (error) {
        console.error("erro ao carregar as questões")
    }
    
}

function mostrarQuestao(){
    document.getElementById("materia").textContent = questoes[questAtual].materia;
    document.getElementById("enunciado").textContent = questoes[questAtual].enunciado;

    botaoProx.style.display = "none";

    const container = document.getElementById('alternativas');
    container.textContent = "";

    const resultado = document.querySelector("#resultado");
    resultado.textContent = "";

    const explicacao = document.querySelector("#explicacao");
    explicacao.textContent = "";

    const placar = document.querySelector("#placar");
    placar.textContent = `Acertos ${qAcertos} | Erros ${qErros}`;

    questoes[questAtual].alternativa.forEach(function(alternativaAtual){
        const alternativaMarq = document.createElement('button');
        alternativaMarq.textContent = alternativaAtual;
        alternativaMarq.classList.add('alternativas');
        container.appendChild(alternativaMarq);
    });

    const botoes = document.querySelectorAll("#alternativas button");
    botoes.forEach(function (botao){

        botao.addEventListener("click", function(){

            let acertouQuestão = false;

            if (botao.textContent === questoes[questAtual].respostaQuestoes){
                resultado.textContent = "Correto!!";
                qAcertos++;
                botao.classList.add('correto');
                acertouQuestão = true;

            }else{
                resultado.textContent = "Errado!!";
                qErros++;
                botao.classList.add('errado');
                acertouQuestão = false;
            }

            historico.push ({
                enunciado: questoes[questAtual].enunciado,
                respostaDoUsuario: botao.textContent,
                foiCorreto: acertouQuestão
            });

            
            botaoProx.style.display = "block";

            explicacao.textContent = questoes[questAtual].explicacao;

            botoes.forEach(function(desabilitarBotao){
                desabilitarBotao.disabled = true;
            });
            placar.textContent = `Acertos ${qAcertos} | Erros ${qErros}`;
        });
    });
    
};
carregarQuestoes();

botaoProx.addEventListener("click", function(){
    if(questAtual < questoes.length -1){
        questAtual++;
        mostrarQuestao();

    }else{
        
        botaoProx.style.display = "none";
        
        const resultado = document.getElementById("resultado");
        resultado.style.display = "none";

        const explicacao = document.getElementById("explicacao");
        explicacao.style.display = "none";

        const materia = document.getElementById("materia");
        materia.style.display = "none";

        const enunciado = document.getElementById("enunciado");
        enunciado.style.display = "none";

        const container = document.getElementById('alternativas');
        container.style.display = "none";

        const final = document.getElementById("final");
        final.textContent = "quiz finalizado";
    }    
})
