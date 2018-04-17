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
    diagnosticPara.innerHTML += input + '<br>';
}
function orderSpeech() {
    var recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    recognition.onresult = function (event) {
        var speechResult = event.results[0][0].transcript.toLowerCase();
        if (speechResult.includes("música")) {
            var artist = speechResult.substr(speechResult.indexOf('música de ') + 10);
            diagnosticPara.innerHTML += speechResult + '<br>';
            orderSynthesis('Mostrando vídeos de ' + artist + '.');
            var newtab = window.open('https://www.youtube.com/results?search_query=' + artist, '_blank');
        } else if (speechResult.includes("busca ")) {
            var search = speechResult.substr(speechResult.indexOf('busca ') + 6);
            diagnosticPara.innerHTML += speechResult + '<br>';
            orderSynthesis('Buscando ' + search + '.');
            var newtab = window.open('https://www.google.es/search?q=' + search, '_blank');
        } else if (speechResult.includes("mi nombre es")) {
            var user = speechResult.substr(speechResult.indexOf('mi nombre es ') + 13);
            diagnosticPara.innerHTML += speechResult + '<br>';
            orderSynthesis('Hola ' + user + ', dime que quieres que busque.');
        } else if (speechResult.includes("me llamo")) {
            var user = speechResult.substr(speechResult.indexOf('me llamo ') + 9);
            diagnosticPara.innerHTML += speechResult + '<br>';
            orderSynthesis('Hola ' + user + ', dime que quieres que busque.');
        } else {
            diagnosticPara.innerHTML += speechResult + '<br>';   
            orderSynthesis('Bueno, ' + speechResult + ', puede sea una opción.');
        };
    };
    recognition.onspeechend = function () {
        //recognition.stop();
        //orderSpeech();
    };
    recognition.onerror = function (event) {
        orderSpeech();
    };
    recognition.onsoundend = function() {
        orderSpeech();
    };
};
orderSynthesis('Hola, mi nombre es Paco, ¿qué tal, cómo te llamas?');
orderSpeech();