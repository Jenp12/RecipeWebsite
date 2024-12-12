curl -X POST \
    -H "Authorization: Bearer YOUR_HUGGING_FACE_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"inputs":"How do I make lasagna?"}' \
    https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill
