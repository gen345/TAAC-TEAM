function calculateBudget() {
    const days = document.getElementById('days').value;
    const travelers = document.getElementById('travelers').value;
    const type = document.getElementById('type').value;

    if (days < 1 || travelers < 1) {
        alert("Please enter valid numbers");
        return;
    }

    // Base rates per day in INR
    let ratePerDay = type === 'student' ? 1500 : 3500;
    
    // Simple logic: Days * Rate * Travelers
    const total = days * ratePerDay * travelers;
    
    document.getElementById('result').innerHTML = `
        <div style="margin-top:20px; padding:20px; background:rgba(255,77,0,0.1); border-radius:15px;">
            <p style="color:#a0a0a0;">Estimated Budget</p>
            <h2 style="color:#ff4d00;">₹${total.toLocaleString('en-IN')}*</h2>
            <small>*Excludes flights/trains. Based on ${type} standards.</small>
        </div>
    `;
}function calculateBudget() {
    const days = document.getElementById('days').value;
    const travelers = document.getElementById('travelers').value;
    const type = document.getElementById('type').value;

    if (days < 1 || travelers < 1) {
        alert("Please enter valid numbers");
        return;
    }

    // Base rates per day in INR
    let ratePerDay = type === 'student' ? 1500 : 3500;
    
    // Simple logic: Days * Rate * Travelers
    const total = days * ratePerDay * travelers;
    
    document.getElementById('result').innerHTML = `
        <div style="margin-top:20px; padding:20px; background:rgba(255,77,0,0.1); border-radius:15px;">
            <p style="color:#a0a0a0;">Estimated Budget</p>
            <h2 style="color:#ff4d00;">₹${total.toLocaleString('en-IN')}*</h2>
            <small>*Excludes flights/trains. Based on ${type} standards.</small>
        </div>
    `;
}