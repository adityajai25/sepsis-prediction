import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
import joblib

# Load the preprocessed dataset
df = pd.read_csv('sepsis_dataset/preprocessed_dataset.csv.gz',compression='gzip')
df.head()
X = df.drop(columns=['SepsisLabel'])  # Features
y = df['SepsisLabel']  # Target variable

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

print(f"Training data shape: {X_train.shape}")
print(f"Testing data shape: {X_test.shape}")

# Initialize Random Forest model
rf_model = RandomForestClassifier(n_estimators=100,max_depth=10,random_state=42,verbose=2)
rf_model.fit(X_train, y_train)

# Make predictions
rf_predictions = rf_model.predict(X_test)

# Evaluate the model
print("Random Forest Accuracy:", accuracy_score(y_test, rf_predictions)*100)
print("Random Forest Classification Report:\n", classification_report(y_test, rf_predictions))

cm = confusion_matrix(y_test, rf_predictions)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

# Save the model using joblib
joblib.dump(rf_model, 'model/rf_model.joblib',compress=('gzip', 3))
