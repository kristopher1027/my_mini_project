import datetime


birth_date = 1995
current_date = 2026

age = current_date-birth_date

print(f"Age: {age}")




birth_date = 2000
current_date = datetime.date.today().year


age = current_date-birth_date
print(f"She is {age} years old")



def age_declare():
    birth_date = int(input("Enter your Year of Birth:"+"\n"))
    current_date = datetime.date.today().year
    age = current_date-birth_date
    print(f"i am {age} years old")

age_declare()
