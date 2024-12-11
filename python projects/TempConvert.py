try:
    temp = int(input('Welcome to temperature converter!\n1. C to K\n2. K to C\n3. F to C\n4. C to F\n5. F to K\n6. K to F\nWhich converter do you want to use?: '))
    if temp not in [1, 2, 3, 4, 5, 6]:
        print("Please enter a valid choice (1-6).")
    else:
        temperature = float(input('What is the temperature?: '))
        convert = {
            1: temperature + 273.15,
            2: temperature - 273.15,
            3: (temperature - 32) * 5/9,
            4: temperature * (9/5) + 32,
            5: (temperature - 32) * 5/9 + 273.15,
            6: (temperature - 273.15) * 9/5 + 32
        }
        print(f'The converted temperature is: {convert[temp]:.2f}')
except ValueError:
    print("Please enter valid numerical values.")

