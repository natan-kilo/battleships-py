from flask import Flask, render_template, request, session, redirect, url_for
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

if __name__ == "__main__":
    app.run()
