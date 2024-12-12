const huggingFaceToken = "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"; 

async function getRecipeResponse(question, retries =3, delay = 2000) {
    const prompt = 'You are a helpful recipe assistant. Answer questions about cooking recipes.\nUser: ${question}';
    try {
        const response = await fetch("https://api-inference.huggingface.co/status/facebook/blenderbot-400M-distill", {
            method: "POST",
            headers: {
                Authorization: Bearer ${huggingFaceToken},
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        if (response.status === 503 && retries > 0) {
            console.warn("Model is loading. Retrying...");
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
            return getRecipeResponse(question, retries - 1, delay);
        }

        if (data.error) {
            console.error("API Error:", data.error);
            return "I'm sorry, there was an error processing your request.";
        }

        return data.generated_text?.trim() || "Sorry, I couldn't find an answer.";
    } catch (error) {
        console.error("Error fetching recipe response:", error);
        return "I'm sorry, something went wrong. Please try again later.";
    }
}

async function isModelReady() {
    const response = await fetch("https://api-inference.huggingface.co/status/facebook/blenderbot-400M-distill", {
        headers: {
            Authorization: Bearer ${huggingFaceToken},
        },
    });
    const data = await response.json();
    console.log("Model Status:", data); // Debugging
    return data.loading === false;
}


document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("chat-input").value.trim();
    if (!userInput) return;

    // Display user input
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += <p><strong>You:</strong> ${userInput}</p>;

    // Check if the model is ready
    const ready = await isModelReady();
    if (!ready) {
        chatOutput.innerHTML += <p><strong>Chatbot:</strong> The model is currently loading. Please try again in a few seconds.</p>;
        return;
    }

    const response = await getRecipeResponse(userInput);
    chatOutput.innerHTML += <p><strong>Chatbot:</strong> ${response}</p>;
    chatOutput.scrollTop = chatOutput.scrollHeight;

    document.getElementById("chat-input").value = "";
    

    // Validate input length
    if (userInput.length > 300) {
        chatOutput.innerHTML += <p><strong>Chatbot:</strong> Your question is too long. Please ask a shorter question.</p>;
        return;
    }

    // Fetch response
    const response = await getRecipeResponse(userInput);
    chatOutput.innerHTML += <p><strong>Chatbot:</strong> ${response}</p>;
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Clear input field
    document.getElementById("chat-input").value = "";
});
