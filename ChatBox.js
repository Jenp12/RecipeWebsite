const huggingFaceToken = "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";

async function getRecipeResponse(question) {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${huggingFaceToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: question }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.generated_text || "Sorry, I couldn't find an answer.";
    } catch (error) {
        console.error("Error fetching recipe response:", error);
        return "I'm sorry, something went wrong. Please try again later.";
    }
}

// Example usage:
document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("chat-input").value.trim();
    if (!userInput) return;

    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    const response = await getRecipeResponse(userInput);
    chatOutput.innerHTML += `<p><strong>Chatbot:</strong> ${response}</p>`;
    chatOutput.scrollTop = chatOutput.scrollHeight;

    document.getElementById("chat-input").value = "";
});

