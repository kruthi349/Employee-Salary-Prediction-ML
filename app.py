from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# -----------------------------
# Load Model
# -----------------------------
model = joblib.load("models/salary_prediction.pkl")
columns = joblib.load("models/columns.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        input_df = pd.DataFrame({

            "job_title": [data["job_title"]],

            "experience_years": [data["experience_years"]],

            "education_level": [data["education_level"]],

            "skills_count": [data["skills_count"]],

            "industry": [data["industry"]],

            "company_size": [data["company_size"]],

            "location": [data["location"]],

            "remote_work": [data["remote_work"]],

            "certifications": [data["certifications"]]

        })

        # Same preprocessing used during training
        input_df = pd.get_dummies(input_df)

        input_df = input_df.reindex(
            columns=columns,
            fill_value=0
        )

        prediction = model.predict(input_df)[0]

        return jsonify({
            "salary": round(float(prediction), 2)
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)