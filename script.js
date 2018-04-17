var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var diagnosticPara = document.querySelector('.output');
var bg = document.querySelector('html');
var synth = window.speechSynthesis;
var voices = synth.getVoices();

function orderSynthesis(input) {
    
    var utterThis = new SpeechSynthesisUtterance(input);
    utterThis.voice = voices[6];
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}

function orderSpeech() {

    bg.style.backgroundColor = 'white';
    var recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        var speechResult = event.results[0][0].transcript.toLowerCase();
        if (speechResult.includes("paco")) {
            bg.style.backgroundColor = 'cyan';
            if (speechResult.includes("música")) {
                var artist = speechResult.substr(speechResult.indexOf('música de ') + 10);
                orderSynthesis('Mostrando vídeos de ' + artist);
                var newtab = window.open('https://www.youtube.com/results?search_query=' + artist, '_blank');
            } else if (speechResult.includes("busca ")) {
                var search = speechResult.substr(speechResult.indexOf('busca ') + 6);
                orderSynthesis('Buscando ' + search);
                var newtab = window.open('https://www.google.es/search?q=' + search, '_blank');
            };
        }
        diagnosticPara.textContent = speechResult;
    }

    recognition.onspeechend = function () {
        recognition.stop();
        orderSpeech();
    }

    recognition.onerror = function (event) {
        orderSpeech();
    }

}
orderSynthesis('Hola Armando, ¿qué tal?');
orderSpeech();