const huggingFaceToken = "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";

async function getRecipeResponse(question) {
    const prompt = `You are a helpful recipe assistant. Answer questions about cooking recipes.\nUser: ${question}`;
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${huggingFaceToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging

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

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("chat-input").value.trim();
    if (!userInput) return;

    // Display user input
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Validate input length
    if (userInput.length > 300) {
        chatOutput.innerHTML += `<p><strong>Chatbot:</strong> Your question is too long. Please ask a shorter question.</p>`;
        return;
    }

    // Fetch response
    const response = await getRecipeResponse(userInput);
    chatOutput.innerHTML += `<p><strong>Chatbot:</strong> ${response}</p>`;
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Clear input field
    document.getElementById("chat-input").value = "";
});

