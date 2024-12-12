const openaiApiKey = "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";

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
                model: "gpt-3.5-turbo", //maybe 4?
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
                max_tokens: 100, // maybe change num 
                temperature: 0.7, 
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`API error: ${data.error?.message || response.statusText}`);
        }

        if (!data.choices || data.choices.length === 0) {
            throw new Error("No response from the API");
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error fetching recipe response:", error);
        return "I'm sorry, I couldn't fetch a response. Please try again later.";
    }
}
