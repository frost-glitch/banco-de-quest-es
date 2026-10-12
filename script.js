const telaInicial = document.getElementById("tela-inicial");
const telaQuestao = document.getElementById("tela-questao");

let questoes = [];
async function carregarQuestoes() {
  try {
    const resposta = await fetch("questoes.json");

    if (!resposta.ok) {
      throw new Error("Erro ao carregar o arquivo JSON");
    }

    questoes = await resposta.json();

    // Adiciona o evento de clique aos botões de matéria
    const btnMateria = document.querySelectorAll(".btn-materia");
    btnMateria.forEach(function (botao) {
      botao.addEventListener("click", function () {
        const materiaSelecionada = botao.getAttribute("data-materia");
        const questoesFiltradas = questoes.filter(function (questao) {
          return questao.materia === materiaSelecionada;
        });

        document.getElementById("tela-inicial").style.display = "none"; // Oculta a tela inicial
        document.getElementById("tela-questao").style.display = "block"; // Exibe a tela de questões
        exibirQuestoes(questoesFiltradas);
      });

      function exibirQuestoes(listaQuestoes) {
        //função para exibir as questões na tela
        listaQuestoes.forEach(function (questaoAtual) {
          let respondido = false; // Variável para controlar se a questão já foi respondida
          const divQuestao = document.createElement("div");

          const enunciado = document.createElement("h2");
          enunciado.textContent = questaoAtual.enunciado;
          divQuestao.appendChild(enunciado);

          const alternativas = document.createElement("ul");
          questaoAtual.alternativas.forEach(function (alternativa) {
            const itemAlternativa = document.createElement("li");
            itemAlternativa.textContent = alternativa;
            alternativas.appendChild(itemAlternativa);

            itemAlternativa.addEventListener("click", function () {
              if (respondido) return; // Impede múltiplas respostas
              const itens = alternativas.querySelectorAll("li");
              itens.forEach(function (item) {
                item.classList.remove("selecionada");
              });
              itemAlternativa.classList.add("selecionada");
            });
          });

          divQuestao.appendChild(alternativas);

          const botaoResponder = document.createElement("button");
          botaoResponder.textContent = "Responder";
          botaoResponder.disabled = false; // Habilita o botão inicialmente
          botaoResponder.addEventListener("click", function () {
            if (respondido) return; // Impede múltiplas respostas
            const respostaSelecionada =
              alternativas.querySelector("li.selecionada");
            if (respostaSelecionada) {
              const respostaCorreta = questaoAtual.resposta;
              if (respostaSelecionada.textContent === respostaCorreta) {
                alert("Resposta correta!");
              } else {
                alert(
                  "Resposta incorreta. A resposta correta é: " +
                    respostaCorreta,
                );
              }
              explicacao.style.display = "block"; // Mostra a explicação após responder
              respondido = true;
              botaoResponder.disabled = true;
            } else {
              alert("Selecione uma alternativa antes de responder.");
            }
          });
          divQuestao.appendChild(botaoResponder);

          const explicacao = document.createElement("p");
          explicacao.textContent = questaoAtual.explicacao;
          explicacao.style.display = "none"; // Inicialmente escondida
          divQuestao.appendChild(explicacao);

          telaQuestao.appendChild(divQuestao);
        });
      }
    });
  } catch (error) {
    console.error("erro ao carregar as questões");
  }
}

carregarQuestoes();
