sales_amount = [150, 300, 500, 400, 350, 540]
threshold = 320
total_sales = 0
largest_sales = 0
count_above_threshold = 0

for sale in sales_amount:
    total_sales += sale
    
    if sale > largest_sales:
        largest_sales = sale
    if sale > threshold:
        count_above_threshold += 1

    
print(f"Total Sales Amount:    ${total_sales:,}")
print(f"Largest Sale Amount:   ${largest_sales:,}")
print(f"Sales Above Threshold: {count_above_threshold}")
