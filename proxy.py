import flask
import requests
import os
import json
app = flask.Flask(__name__)

ROOT = os.path.join(os.getcwd(), "phonegap", "www")
APP = "http://chipinapp.herokuapp.com/"

@app.route('/', defaults={'path': 'index.html'}, methods=["GET", "PUT", "POST", "DELETE"])
@app.route('/<path:path>', methods=["GET", "PUT", "POST", "DELETE"])
def catch_all(path):
    method = flask.request.method
    if method == "GET":
        do = requests.get
    elif method == "POST":
        do = requests.post
    elif method == "PUT":
        do = requests.put
    elif method == "DELETE":
        do = requests.delete
    else:
        raise Exception("You lose")

    if path.split('/')[0] in ['ping', 'login', 'users']:
        headers = {}
        if 'Cookie' in flask.request.headers:
            headers['Cookie'] = flask.request.headers['Cookie']
        if 'Content-Type' in flask.request.headers:
            headers['Content-Type'] = flask.request.headers['Content-Type']

        r = do(APP + path, data=flask.request.data, headers=headers)
        if r.headers:
            return r.text, r.status_code, dict(r.headers)
        else:
            return r.text, r.status_code

    if path.endswith(".css"):
        return open(os.path.join(ROOT, path)).read(), 200, {'content-type': 'text/css'}
    elif path.endswith(".js"):
        return open(os.path.join(ROOT, path)).read(), 200, {'content-type': 'text/js'}
    else:
        return open(os.path.join(ROOT, path)).read()

if __name__ == "__main__":
    app.run(debug=True)