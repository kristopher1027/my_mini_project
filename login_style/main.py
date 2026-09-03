user_name = "admin_user"
user_password = "secret123"

def attempt_login():
    entered_username = input("ENTER USERNAME: ")
    entered_password = input("ENTER PASSWORD: ")

    cleaned_username = entered_username.strip()
    cleaned_password = entered_password.strip()

    if  not cleaned_username or  not cleaned_password:
        print("Error Invalid username and password, Try Again")
    elif cleaned_username == user_name and cleaned_password == user_password:
        print("Login Successful")
    else:
        print("Try Again Later, invalid password and username")

attempt_login()
