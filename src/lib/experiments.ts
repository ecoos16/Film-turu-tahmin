export const experiments = [
  { model: "Decision Tree", acc: 0.548, f1: 0.459, note: "Baseline" },
  { model: "Naive Bayes", acc: 0.301, f1: 0.269, note: "Kategorik + dengesiz sınıf" },
  { model: "RF (Accuracy Tuned)", acc: 0.677, f1: 0.474, note: "Accuracy odaklı GridSearch" },
  { model: "RF (F1-Macro Tuned)", acc: 0.677, f1: 0.576, note: "Macro-F1 odaklı GridSearch" },
];
