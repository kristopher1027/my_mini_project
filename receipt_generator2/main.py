def generate_receipt(store_name, items, tax_rate=0.075):
    print("=" * 40)
    print(f"{store_name:^40}")
    print("=" * 40)
    
    subtotal = 0
    for name, price, qty in items:
        total_price = price * qty
        subtotal += total_price
        print(f"{name:<20} x{qty:<3} ${price:>6.2f} = ${total_price:>7.2f}")
    
    tax = subtotal * tax_rate
    grand_total = subtotal + tax
    
    print("-" * 40)
    print(f"{'Subtotal:':<30} {subtotal:>8.2f}")
    print(f"{'Tax (7.5%):':<30} {tax:>8.2f}")
    print(f"{'Total:':<30} {grand_total:>8.2f}")
    print("=" * 40)
    print(f"{'Thank you for your patronage!':^40}")
    print("=" * 40)

# Example usage:
purchase_items = [
    ("Notebook", 1500.00, 2),
    ("Pen", 300.00, 5),
    ("Stapler", 2500.00, 1)
]

generate_receipt("Otukpo Store Hub", purchase_items)
