menu = {
    'pizza' : 135.00,
    'burger' : 100.00,
    'hotdogs' : 45.00,
    'popcorn' : 175.00,
    'drinks' : 35.00
}

cart = []
total = 0

print('-' * 10, 'MENU', '-' * 10)
for key, value in menu.items():
    print(f'{key:10} : {value:.2f}php')
print('-' * 26) 

while True:
    food = input('Select an item that you want to buy (q to quit): ').lower()
    if food == 'q':
        break
    elif menu.get(food) is not None:
        cart.append(food)
        
for food in cart:
    total += menu.get(food)
    print(food, end = ' ')
print() 
print('-' * 26)    
print(f'Total is: {total:.2f}php.')
