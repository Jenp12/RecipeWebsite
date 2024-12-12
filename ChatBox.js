const openaiApiKey = "your-openai-api-key";

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("chat-input").value.trim();
    if (!userInput) return;

    // Display user input in the chat
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Call the OpenAI API
    const response = await getRecipeResponse(userInput);

    // Display the response
    chatOutput.innerHTML += `<p><strong>Chatbot:</strong> ${response}</p>`;
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Clear the input field
    document.getElementById("chat-input").value = "";
});

async function getRecipeResponse(question) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Use "gpt-4" if available and you prefer it
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that only answers questions about recipes.",
                    },
                    {
                        role: "user",
                        content: question,
                    },
                ],
                max_tokens: 100, // Adjust token limit as needed
                temperature: 0.7, // Adjust creativity level
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error fetching recipe response:", error);
        return "I'm sorry, I couldn't fetch a response. Please try again later.";
    }
}
