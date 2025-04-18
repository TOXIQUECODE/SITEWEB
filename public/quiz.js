document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let score = 0;
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked'),
        q2: document.querySelector('input[name="q2"]:checked'),
        q3: document.querySelector('input[name="q3"]:checked'),
    };

    if (answers.q1) score += answers.q1.value === 'A' ? 1 : 0;
    if (answers.q2) score += answers.q2.value === 'A' ? 1 : 0;
    if (answers.q3) score += answers.q3.value === 'C' ? 1 : 0;

    let resultText = '';
    if (score === 3) {
        resultText = "Ton Morkie est un démon en chef ! 👹";
    } else if (score === 2) {
        resultText = "Ton Morkie est un petit démon en formation. 😈";
    } else {
        resultText = "Ton Morkie est probablement un ange... mais c’est juste une façade ! 😇";
    }

    document.getElementById('result').innerText = resultText;
});
