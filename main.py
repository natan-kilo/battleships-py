from flask import Flask, render_template, request, session, redirect, url_for, make_response
import socket
app = Flask(__name__)

app.secret_key = "abcdefg"

@app.route("/")
def index():
    try:
        test = session["username"]
        print(test)
    except:
        return render_template("/scenes/username/index.html")
    return redirect(url_for("mainMenu"))

@app.route("/mainmenu")
def mainMenu():
    return render_template("/scenes/mainMenu/index.html")

@app.route("/setusername", methods=["GET", "POST"])
def setUsername():
    if request.method == "POST":
        session["username"] = request.form["username"]
        return redirect(url_for("index"))
    return redirect(url_for("index"))

@app.route("/settings")
def settings():
    return render_template("/scenes/settings/index.html")

@app.route("/playmultiplayer")
def playMultiplayer():

    return render_template("/scenes/gameMultiplayer/index.html")

@app.route("/playmultiplayer-host")
def hostMultiplayer():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ip = socket.gethostbyname(socket.gethostname())
    port = 10000
    s.bind((ip, port))
    s.listen(5)
    c, (c_ip, c_port) = s.accept()
    session["client-sock"] = c
    session["client-ip"] = c_ip
    session["client-port"] = c_port
    session["multiplayer-type"] = "host"

@app.route("/playmultiplayer-connect", methods=["POST"])
def connectMultiplayer():
    if request.form == "POST":
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            ip = socket.gethostbyname(request.form["targetIp"])
        except:
            return redirect(url_for("playMultiplayer"))
        port = 10000
        while True:
            try:
                s.connect((ip, port))
                break
            except:
                pass
        session["server-sock"] = s
        session["mutiplayer-type"] = "client"


if __name__ == "__main__":
    app.run()
