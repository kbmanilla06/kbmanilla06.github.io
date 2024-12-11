operator = input('Enter an operator (+, -, *, /): ')
num1 = float(input('Enter the first integer: '))
num2 = float(input('Enter the second integer: '))
if operator == '+':
    print(f'{num1} + {num2} = ', num1+num2)
elif operator == '-':
    print(f'{num1} - {num2} = ', num1-num2)
elif operator == '*':
    print(f'{num1} * {num2} = ', num1*num2)
elif operator == '/':
    print(f'{num1} / {num2} = ', num1/num2)
else:
    print('Invalid operator!')    
