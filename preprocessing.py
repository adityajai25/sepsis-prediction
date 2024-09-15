import pandas as pd

df = pd.read_csv('sepsis_dataset/dataset.csv.gz',compression='gzip')
print(df.head())
print(df.shape)

parameters = ['Age','Gender','HR','O2Sat','Temp','SBP','MAP','DBP','Resp','BUN','Lactate','Creatinine','Bilirubin_total','Glucose','WBC','SepsisLabel']

df = df[parameters]
print(df.shape)

#missing percentage 

missing_values = df.isnull().sum()
missing_percentage = (missing_values/df.shape[0])*100
print(missing_percentage)

# Fill missing values with the mean of the respective columns
df.fillna(df.mean(), inplace=True)
print(df.head())

missing_values = df.isnull().sum()
missing_percentage = (missing_values/df.shape[0])*100
print(missing_percentage)

df.to_csv('sepsis_dataset/preprocessed_dataset.csv.gz', index=False,compression='gzip')
