import sys
import json
import joblib
import pandas as pd
from pathlib import Path

def main():
    # stdin’den gelen JSON’u al
    raw = sys.stdin.read()
    payload = json.loads(raw)
    features = payload.get("features", {})

    # model paketi
    model_path = Path(__file__).parent / "final_model.joblib"
    pkg = joblib.load(model_path)

    pipe = pkg["pipeline"]
    classes = pkg["classes"]
    feature_cols = pkg["feature_cols"]

    # Tek satırlık dataframe oluştur
    row = {c: features.get(c, None) for c in feature_cols}
    X = pd.DataFrame([row])

    # Tahmin + olasılık
    pred = pipe.predict(X)[0]
    proba = pipe.predict_proba(X)[0]

    probabilities = {classes[i]: float(proba[i]) for i in range(len(classes))}

    out = {
        "prediction": str(pred),
        "probabilities": probabilities
    }

    print(json.dumps(out, ensure_ascii=False))

if __name__ == "__main__":
    main()
