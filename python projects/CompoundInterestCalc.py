principle = 0
rate = 0
time = 0

while True:
    principle = float(input('Enter the principle amount: '))
    if principle < 0:
        print('Principle can not be less than zero')
    else:
        break
        
while True:
    rate = float(input('Enter the interest rate: '))
    if rate < 0:
        print('Interest rate can not be less than zero')
    else: 
        break
        
while True:
    time = int(input('Enter the time in years: '))
    if time < 0:
        print('Time can not be less than zero')
    else:
        break

total = principle * pow((1 + rate / 100), time)
monthly = total / (time*12)
print(f'Balance after {time} year/s: ${total:.2f}\nYour monthly bill is: ${monthly:.2f}')
