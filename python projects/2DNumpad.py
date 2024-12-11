numpad = ((1,2,3),(4,5,6),(7,8,9),('*', 0, '#'))

for keypad in numpad:
    for i in keypad:
        print(i, end=' ')
    print()
