// public/script.js
function calculateEfficiency() {
    const location = parseInt(document.getElementById('location').value);
    const panelType = document.getElementById('panelType').value;
    const tiltAngle = parseInt(document.getElementById('tiltAngle').value);

    const efficiency = calculateActualEfficiency(location, panelType, tiltAngle);

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Estimated Solar Efficiency: ${efficiency.toFixed(2)}%`;

    offerOptimizationSuggestions(efficiency);
}

function calculateActualEfficiency(location, panelType, tiltAngle) {
    
    const baseEfficiency = 20;
    const tiltEfficiency = tiltAngle > 0 ? tiltAngle * 0.5 : 0; 
    const locationEfficiency = location > 4 ? (location - 4) * 1.5 : 0; 

    const totalEfficiency = baseEfficiency + tiltEfficiency + locationEfficiency;
    return Math.min(totalEfficiency, 100);
}

function offerOptimizationSuggestions(efficiency) {
    const suggestionElement = document.getElementById('suggestions');
    if (efficiency < 70) {
        suggestionElement.innerHTML = 'Consider optimizing your setup for better efficiency. Contact a professional for advice.';
    } else {
        suggestionElement.innerHTML = '';
    }


}
