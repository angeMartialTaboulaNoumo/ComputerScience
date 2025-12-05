from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle
from flask_cors import CORS

encoder_model = load_model("encoders_decoders/encoder_model.h5")
decoder_model = load_model("encoders_decoders/decoder_model.h5")
# Charger le tokenizer des questions
with open("tokens/tokenizer_questions.pkl", "rb") as f:
    tokenizer_questions = pickle.load(f)

# Charger le tokenizer des réponses
with open("tokens/tokenizer_answers.pkl", "rb") as f:
    tokenizer_answers = pickle.load(f)

max_len_questions = 11  # à ajuster selon ton dataset
max_len_answers = 12     # à ajuster selon ton dataset

#Fonction pour générer une réponse
def generate_response(input_text):
    seq = tokenizer_questions.texts_to_sequences([input_text])
    seq = pad_sequences(seq, maxlen=max_len_questions, padding='post')

    states_value = encoder_model.predict(seq)

    target_seq = np.array([[tokenizer_answers.word_index['<start>']]])
    decoded_sentence = ''
    stop_condition = False

    while not stop_condition:
        output_tokens, h, c = decoder_model.predict([target_seq] + states_value)
        sampled_token_index = np.argmax(output_tokens[0, -1, :])
        sampled_word = tokenizer_answers.index_word.get(sampled_token_index, '')

        if sampled_word == '<end>' or len(decoded_sentence.split()) > max_len_answers:
            stop_condition = True
        else:
            decoded_sentence += sampled_word + ' '

        target_seq = np.array([[sampled_token_index]])
        states_value = [h, c]

    return decoded_sentence.strip()

#appli

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if 'question' not in data:
        return jsonify({'error': 'Missing "question" field'}), 400

    question = data['question']
    answer = generate_response(question)

    return jsonify({'question': question, 'answer': answer})


if __name__ == '__main__':
    app.run(host='192.168.235.135', port=5000, debug=True)
