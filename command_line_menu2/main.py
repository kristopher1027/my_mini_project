# Design a small command-line menu that repeatedly offers three actions and exits only when the user
# chooses quit.

choice = ""

while choice != "quit":
    print("\n ----Menu -----")
    print("1 ==> say Hello")
    print("2 ==> tell a joke")
    print("3 ==> type quit to exit")

    choice = input("Enter Any Option   ")
    if choice == "1":
        print("Hello, Python Engineer")
    elif choice == "2":
        print("Why do programmers wear glasses? Because they can't C#! 🤓")
    elif choice == "3" or choice == "quit":
        print("Thank you for your time")
        break
    else:
        print("Invalid option Select again")
