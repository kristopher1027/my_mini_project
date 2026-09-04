choice = "" 
account = "1234567890"
name = "Mr John Ogbe"
pin = "1234"
phone_number = "07012345678"

while choice != "6" and choice != "quit":
    print("\n---- Opay ----")
    print("1. Transfer")
    print("2. Open Account")
    print("3. Airtime and Data")
    print("4. Check Balance")
    print("5. Bank Status")
    print("6. Type 'quit' or '6' to exit")

    choice = input("Choose an option: \n")
   
    if choice == "1":
        print("\n--- Transfer Menu ---")
        print("1. Send to Opay")
        print("2. Send to other bank")
        transfer_type = input("Select an Option: \n")
        
        # --- Option 1: Send to Opay ---
        if transfer_type == "1":
            target_account = input("Enter Account Number: \n")
            amount = input("Enter Amount: \n")
            if target_account == account:
                print(f"\nAbout To Send {amount} to {name}")
                secret = input("Input your Pin: ")
                if secret == pin:
                    print(f"🎉 Success! You Have Successfully Sent {amount} to {name}\n")
                else:
                    print("❌ Incorrect PIN. Transfer failed.")
            else:
                print("❌ Account number not found.")
                break
                
        # --- Option 2: Send to Other Bank ---
        elif transfer_type == "2":
            print("\n--- Select Bank ---")
            print("1. First Bank")
            print("2. Access Bank")
            print("3. GTB Bank")
            print("4. Zenith Bank")
            print("5. Unity Bank")
            print("6. Not Listed")
            
            bank_choice = input("Select Any Option: \n")
            
            if bank_choice == "6":
                bank_search = input("Enter first 3 letters of the bank: \n")
                print(f"Searching for banks matching '{bank_search}'...")
            
            target_account = input("Enter Account Number: \n")
            amount = input("Enter Amount: \n")
            
            if target_account == account:
                print(f"\nAbout To Send {amount} to {name}")
                secret = input("Input your Pin: ")
                if secret == pin:
                    print(f"🎉 Success! You Have Successfully Sent {amount} to {name}\n")
                else:
                    print("❌ Incorrect PIN. Transfer failed.")
            else:
                print("❌ Account number not found.")

    elif choice == "2":
        print("\n[Feature coming soon: Open Account]")

    elif choice == "3":
        choice = input("Enter Phone Number (press 9 to Return)\n")
        amount = input("Enter Amount: \n")

        if choice == phone_number:
            secret = input("Input your Pin: ")
            if secret == pin:
                print(f"🎉 Success! You Have Successfully Sent {amount} to {phone_number}\n")
                break
            else:
                print("❌ Incorrect PIN. Transfer failed.")
        else: 
            print("❌ Account number not Correct.")
            

    elif choice == "4":
        secret = input("Input your Pin: ")
        if secret == pin:
            print(f"Your Balance = {"$1000"}")
            print(f"Your Owealth = {"$100.00"}")
            print(f"Your Cashback = {"$0.00"}")
            break
            
        else:
            print("❌ Incorrect PIN. Balence Enquiries failed.")
        
    elif choice == "5":
        print("\n[Feature coming soon: Bank Status]")
    elif choice in ["6", "quit"]:
        print("\nThank you for using Opay. Goodbye!")
    else:
        print("\n❌ Invalid option. Select again.")
