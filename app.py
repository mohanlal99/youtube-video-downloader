from flask import Flask, request, jsonify
from flask_cors import CORS
from pytube_download import download_video

app = Flask(__name__)
CORS(app)

@app.route('/download', methods=['POST'])
def download():
    json_data = request.get_json()
    url = json_data['url']
    success = download_video(url)
    if success:
        return jsonify({'message': 'Download successful'}), 200
    else:
        return jsonify({'error': 'Failed to download video'}), 500

if __name__ == "__main__":
    app.run(debug=True)
