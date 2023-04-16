
//Criamos a função para que as variáveis recebam o conteúdo indicado
function ajustaTamanhoPalcoJogo(){
    //Window representa o browser, a partir dele temos informações do browser
    //innerHeight e innerWidth informam altura e largura da janela visíviel
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

var vidas = 1
var tempo = 15 //representando 10 segundos

var criaMosquitoTempo = 1500

var nivel = window.location.search //A propriedade href retorna a url inteira, usamos o search para recuperarmos tudo que está na interrogação
nivel = nivel.replace('?', '') //A esquerda o que queremos alterar e a direita o que colocaremos no lugar

if(nivel === 'normal') {
    //1500ms
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    //1000ms
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
    //750ms
    criaMosquitoTempo = 750
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo -= 1 //cada loop diminuirá 1

    if (tempo < 0 ) {
        clearInterval (cronometro)
        clearInterval (criaMosquito)
        //Usamos o clearInterval para limpar o loop quando o tempo for zerado
        window.location.href = 'vitoria.html' //criamos uma página de vitoria
    } else {
        document.getElementById('cronometro').innerHTML = tempo //innerHTML é o valor contido entre as tags
    }
}, 1000)



function posicaoRandomica(){

    //remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            window.location.href = 'fim.html' //criamos uma página de gameover
        } else {
            document.getElementById('v' + vidas).src='imagens/coracao_vazio.png' //Assim alteramos o coração do HTML

            vidas++
        }
    } //Sempre que for feito um loop, vidas ganhará +1, acessando assim o id "v2" do html e assim continuando até a ultima vida.

    // Math.floor faz o arredondamento para baixo para tirar as casas decimais
    //Usamos o Math.random * o valor que queremos que seja o máximo do random.
    //Multiplicamos para que tenhamos valores "inteiros" e nunca passando dos limites da janela (necessário a multiplicação para usar o Math.floor)
    //ultilizamos o "-90" para que a mosca nunca passe da tela, tendo um limite para onde pode se mover
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //o codigo abaixo serve para que, caso o random caia em 0, ele irá calcular -90, o que ficará negativo e sumirá da tela, logo, o código abaixo diz:
    //se posicao for menor que 0, valerá 0, se não, continuará o que estivervalendo.
    posicaoX = posicaoX < 0 ? 0 : posicaoX 
    posicaoY = posicaoY < 0 ? 0 : posicaoY


    console.log(posicaoX, posicaoY)

    //Cirar o elemento HTML
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png' // Para aparecer a mosca na função.
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //A função tamanhAleatório guarda 3 tipos de classes, a função ladoAleatorio guarda 2 classes.
    //OBS: devemos usar o espaçamento + ' ' + para que ambas funões sejam usadas. 
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px' //Não esquecer de colocar os px
    mosquito.style.position = 'absolute' //absolute serve para "soltar" a imagem na tela
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove() //Como a função ta associada ao elemento html, podemos usar o "this" que faz referencia ao próprio elemento.
    }

    //para adicionarmos um elemento dentro de outro elemento, transformamos ele é uma variável
    document.body.appendChild(mosquito)

    
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3) //Multiplicamos para 3 para aumentar o limite máximo

    //Usaremos um switch para tomada de decisão dependendo do resultado
    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2) //Multiplicamos para 2 para aumentar o limite máximo

    //Usaremos um switch para tomada de decisão dependendo do resultado
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

