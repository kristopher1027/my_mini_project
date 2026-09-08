def start_generator():
    print("=== Welcome to the Receipt Generator ===")
    store_name = "OTUKPO STORE HUB"
    items = []
    tax_rate = 0.075  # 7.5% Tax

    # Loop to collect items from the user
    while True:
        name = input("\nEnter item name (or type 'done' to finish): ").strip()
        if name.lower() == 'done':
            break
        if not name:
            print("Item name cannot be empty!")
            continue

        try:
            price = float(input(f"Enter price for '{name}': ₦"))
            qty = int(input(f"Enter quantity for '{name}': "))
            if price <= 0 or qty <= 0:
                print("Price and quantity must be greater than 0!")
                continue
            
            # Save the item to our list
            items.append((name, price, qty))
            print(f"-> Added {name} x{qty} to cart.")
        except ValueError:
            print("Invalid input! Please enter numbers for price and quantity.")

    # Generate the receipt if items exist
    if not items:
        print("\nNo items were added. Exiting.")
        return

    print("\n" + "=" * 45)
    print(f"{store_name:^45}")
    print("=" * 45)
    
    subtotal = 0
    for name, price, qty in items:
        total_price = price * qty
        subtotal += total_price
        # Crop long names to keep alignment neat
        short_name = name[:20]
        print(f"{short_name:<22} x{qty:<3} @ {price:>7.2f} = {total_price:>8.2f}")
        
    tax = subtotal * tax_rate
    grand_total = subtotal + tax
    
    print("-" * 45)
    print(f"{'Subtotal:':<32} ₦{subtotal:>10.2f}")
    print(f"{'Tax (7.5%):':<32} ₦{tax:>10.2f}")
    print(f"{'Total:':<32} ₦{grand_total:>10.2f}")
    print("=" * 45)
    print(f"{'Thank you for your patronage!':^45}")
    print("=" * 45)

if __name__ == "__main__":
    start_generator()
