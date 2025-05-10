const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const botaoStartPause = document.querySelector('.app__card-primary-button');
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const imagemBotaoIniciarOuPausar = document.querySelector(
  '.app__card-primary-butto-icon'
);
const tempoNaTela = document.getElementById('timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPause = new Audio('/sons/pause.mp3');
const somPlay = new Audio('/sons/play.wav');
const somFimTempo = new Audio('/sons/beep.mp3');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
  musica.paused ? musica.play() : musica.pause();
});

botaoFoco.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto('foco');
  botaoFoco.classList.add('active');
});
botaoCurto.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto('descanso-curto');
  botaoCurto.classList.add('active');
});
botaoLongo.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto('descanso-longo');
  botaoLongo.classList.add('active');
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach((contexto) => {
    contexto.classList.remove('active');
  });
  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `/imagens/${contexto}.png`);
  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case 'descanso-curto':
      titulo.innerHTML = `Que tal dar uma respirada? <br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    somFimTempo.play();
    alert('Tempo finalizado!');
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};
botaoStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    somPause.play();
    return;
  }
  somPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBotao.textContent = 'Pausar';
  imagemBotaoIniciarOuPausar.src = './imagens/pause.png';
}

function zerar() {
  iniciarOuPausarBotao.textContent = 'Começar';
  imagemBotaoIniciarOuPausar.src = './imagens/play_arrow.png';
  clearInterval(intervaloId);
  intervaloId = null;
  tempoDecorridoEmSegundos = 25;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {
    minute: '2-digit',
    second: '2-digit',
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
