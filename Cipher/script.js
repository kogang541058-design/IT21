// Function to get plaintext from form inputs
function getPlaintext() {
    const fullName = document.getElementById('fullName').value.toUpperCase();
    const yearLevel = document.getElementById('yearLevel').value;
    const course = document.getElementById('course').value.toUpperCase();
    
    if (!fullName || !yearLevel || !course) {
        alert('Please fill in all fields');
        return null;
    }
    
    const plaintext = `${fullName} | ${yearLevel} | ${course}`;
    return plaintext;
}

// Function to shift a single character using Caesar cipher
function shiftChar(char, key, isDecrypt = false) {
    // Check if character is uppercase letter
    if (char >= 'A' && char <= 'Z') {
        const charCode = char.charCodeAt(0) - 'A'.charCodeAt(0); // 0-25
        let newCode;
        
        if (isDecrypt) {
            // D = (X - N) % 26
            newCode = (charCode - key + 260) % 26; // +260 to handle negative numbers
        } else {
            // E = (X + N) % 26
            newCode = (charCode + key) % 26;
        }
        
        return String.fromCharCode(newCode + 'A'.charCodeAt(0));
    }
    
    // Check if character is lowercase letter
    if (char >= 'a' && char <= 'z') {
        const charCode = char.charCodeAt(0) - 'a'.charCodeAt(0); // 0-25
        let newCode;
        
        if (isDecrypt) {
            // D = (X - N) % 26
            newCode = (charCode - key + 260) % 26;
        } else {
            // E = (X + N) % 26
            newCode = (charCode + key) % 26;
        }
        
        return String.fromCharCode(newCode + 'a'.charCodeAt(0));
    }
    
    // Return unchanged if not a letter (spaces, numbers, symbols)
    return char;
}

// Function to encrypt or decrypt text
function caesarCipher(text, key, isDecrypt = false) {
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        result += shiftChar(text[i], key, isDecrypt);
    }
    
    return result;
}

// Function to encrypt data
function encryptData() {
    const plaintext = getPlaintext();
    
    if (!plaintext) {
        return;
    }
    
    const key = parseInt(document.getElementById('keyN').value);
    
    if (isNaN(key) || key < 1 || key > 25) {
        alert('Please enter a valid key between 1 and 25');
        return;
    }
    
    // Display plaintext
    document.getElementById('plaintextOutput').innerHTML = `<span style="color: #333; font-weight: 500;">${plaintext}</span>`;
    
    // Encrypt
    const ciphertext = caesarCipher(plaintext, key, false);
    document.getElementById('ciphertextOutput').innerHTML = `<span style="color: #667eea; font-weight: 500;">${ciphertext}</span>`;
    
    // Clear decrypted output
    document.getElementById('decryptedOutput').innerHTML = '<p>Click Decrypt button to decrypt</p>';
}

// Function to decrypt data
function decryptData() {
    const plaintext = getPlaintext();
    
    if (!plaintext) {
        return;
    }
    
    const key = parseInt(document.getElementById('keyN').value);
    
    if (isNaN(key) || key < 1 || key > 25) {
        alert('Please enter a valid key between 1 and 25');
        return;
    }
    
    // Check if ciphertext exists (user should have encrypted first or entered data)
    const ciphertextContent = document.getElementById('ciphertextOutput').textContent;
    
    if (ciphertextContent === 'Your encrypted text will appear here') {
        alert('Please encrypt data first by clicking the Encrypt button');
        return;
    }
    
    // Get ciphertext and decrypt it
    const ciphertext = document.getElementById('ciphertextOutput').innerHTML
        .replace(/<[^>]*>/g, ''); // Remove HTML tags to get plain text
    
    const decrypted = caesarCipher(ciphertext, key, true);
    document.getElementById('decryptedOutput').innerHTML = `<span style="color: #f5576c; font-weight: 500;">${decrypted}</span>`;
}

// Function to reset form
function resetForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('yearLevel').value = '';
    document.getElementById('course').value = '';
    document.getElementById('keyN').value = '';
    
    document.getElementById('plaintextOutput').innerHTML = '<p>Your plaintext will appear here</p>';
    document.getElementById('ciphertextOutput').innerHTML = '<p>Your encrypted text will appear here</p>';
    document.getElementById('decryptedOutput').innerHTML = '<p>Your decrypted text will appear here</p>';
    
    document.getElementById('fullName').focus();
}

// Allow Enter key to trigger encrypt
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                encryptData();
            }
        });
    });
});
