const telaInicial = document.getElementById("tela-inicial");
const telaQuestao = document.getElementById("tela-questao");

let questoes = [];
async function carregarQuestoes() {
    try {
        const resposta = await fetch('questoes.json');
        questoes = await resposta.json();
        
        questoes.forEach(function(questaoAtual) {
            let respondido = false; // Variável para controlar se a questão já foi respondida
            const divQuestao = document.createElement("div");

            const enunciado = document.createElement("h2");
            enunciado.textContent = questaoAtual.enunciado;
            divQuestao.appendChild(enunciado);

            const alternativas = document.createElement("ul");
            questaoAtual.alternativas.forEach(function(alternativa) {
                const itemAlternativa = document.createElement("li");
                itemAlternativa.textContent = alternativa;
                alternativas.appendChild(itemAlternativa);

                itemAlternativa.addEventListener("click", function() {
                    if (respondido) return; // Impede múltiplas respostas
                    const itens = alternativas.querySelectorAll("li");
                    itens.forEach(function(item) {
                        item.classList.remove("selecionada");
                    });
                    itemAlternativa.classList.add("selecionada");
                });
            });

            divQuestao.appendChild(alternativas);

            const botaoResponder = document.createElement("button");
            botaoResponder.textContent = "Responder";
            botaoResponder.disabled = false; // Habilita o botão inicialmente
            botaoResponder.addEventListener("click", function() {
                if (respondido) return; // Impede múltiplas respostas  
                const respostaSelecionada = alternativas.querySelector("li.selecionada");
                if (respostaSelecionada) {
                    const respostaCorreta = questaoAtual.resposta;
                    if (respostaSelecionada.textContent === respostaCorreta) {
                        alert("Resposta correta!");
                    } else {
                        alert("Resposta incorreta. A resposta correta é: " + respostaCorreta);
                    }
                    respondido = true;
                    botaoResponder.disabled = true;
                } else {
                    alert("Selecione uma alternativa antes de responder.");
                }
            });

            const explicacao = document.createElement("p");
            explicacao.textContent = questaoAtual.explicacao;
            explicacao.style.display = "none"; // Inicialmente escondida
            divQuestao.appendChild(explicacao);

            botaoResponder.addEventListener("click", function() {
                explicacao.style.display = "block"; // Mostra a explicação após responder
            });
            divQuestao.appendChild(botaoResponder);
            telaQuestao.appendChild(divQuestao);
        })
        
    } catch (error) {
        console.error("erro ao carregar as questões")
    }
    
}

carregarQuestoes();
