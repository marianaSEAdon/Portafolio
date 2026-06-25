from flask import Flask, render_template, request, jsonify
import resend
from dotenv import load_dotenv
import os 
import re

load_dotenv()

resend.api_key = os.environ["RESEND_API_KEY"]

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        nombre = request.form['name']
        correo = request.form['email']
        mensaje = request.form['message']
        honeypot = request.form.get("website")
        
        
        if honeypot and honeypot.strip():
            return jsonify({"status": "error","message": "Spam detectado"})

        if len(nombre) < 2 or len(nombre) > 50:
            return jsonify({"status": "error", "message": "El nombre debe tener entre 2 a 50 letras"})
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", correo):
            return jsonify({"status": "error", "message": "El correo es invalido"})
        
        if not mensaje or len(mensaje) < 10:
            return jsonify({"status": "error", "message": "El mensaje debe tener al menos 10 caracteres"})
        
        if len(mensaje) > 1000:
            return jsonify({"status": "error", "message": "El mensaje es demasiado largo"})
        
        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": "marianaemiliasanchez24@gmail.com",
            "subject": "Mensaje de tu Portafolio",
            "html": f"""<h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <p><strong>Mensaje:</strong></p><p>{mensaje}</p>"""
            })

        #enviar mensaje
        return jsonify({"status": "success", "message": "Mensaje enviado correctamente"})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)})
    

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)