from flask import Flask, jsonify, request
from flask_cors import CORS

from sama_python.Input_Data import Input_Data
import sama_python.pso as pso

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

def process_data(data):
    input_data = Input_Data()

    input_data.n_ir_rate = data["n_ir_rate"]
    input_data.e_ir_rate = data["e_ir_rate"]
    input_data.Tax_rate = data["Tax_rate"]
    input_data.RE_incentives_rate = data["RE_incentives_rate"]

    # random function to output answer (replace with actual backend function that does the calculation)
    answer = input_data.n_ir_rate * input_data.e_ir_rate + input_data.Tax_rate - input_data.RE_incentives_rate

    return answer


@app.route("/submit/test", methods=['POST'])
def submit_form():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No JSON data provided"})
        
        ### From Julia's code:
        # Input_Data = process_data(data)
        # Input_Data.completeInitialization()
        # if Input_Data is None:
        #     return jsonify({'error': 'Invalid data format or missing required fields'}), 400
        # answer = pso.run(Input_Data)
        # if answer is None:
        #     return jsonify({'error': 'Failed to generate answer'}), 500
        # answer["isGeneralCalculator"] = True
        # return jsonify(answer)

        answer = process_data(data)

        return jsonify({"result": answer})
    
    except Exception as e:
        app.logger.error(f'Error in submit_advanced: {e}')
        return jsonify({'error': 'An unexpected error occurred'}), 500