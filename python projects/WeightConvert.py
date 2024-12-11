weight = float(input('Enter your weight: '))
unit = input('Is that in Kilo(K) or Pounds(L): ').upper()
if unit == 'K':
    print(f'{weight}kg is: ', round(weight*2.2, 2),'lbs')
elif unit == 'L':
    print(f'{weight}lbs is: ', round(weight/2.2, 2),'kg')
else:
    print('Invalid Unit!')

