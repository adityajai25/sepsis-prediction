import pandas as pd

df = pd.read_csv('sepsis_dataset/dataset.csv.gz',compression='gzip')
print(df.head())
print(df.shape)

parameters = ['Age','Gender','HR','O2Sat','Temp','SBP','MAP','DBP','Resp','BUN','Lactate','Creatinine','Bilirubin_total','Glucose','WBC','SepsisLabel']

df = df[parameters]
print(df.shape)

# Fill missing values with the mean of the respective columns
df.fillna(df.mean(), inplace=True)
print(df.head())

df.to_csv('sepsis_dataset/preprocessed_dataset.csv.gz', index=False,compression='gzip')
