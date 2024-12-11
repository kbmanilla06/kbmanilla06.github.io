username = input('Enter your username: ')

if len(username) > 12:
    print(f'Your username can not be more than 12 characters')
elif not username.find(' ') == -1:
    print('No spaces allowed')
elif not username.isalpha():
    print('No numeric elements allowed')
else:
    print(f'Username created\nWelcome, {username}')

