
questions = ('1 + 1 = ?',
             '2 + 2 = ?',
             '3 + 3 = ?',
             '4 + 4 = ?',
             '5 + 5 = ?')
options = (('A. 2', 'B. 4', 'C. 6', 'D. 8', 'E. 10'),
           ('A. 2', 'B. 4', 'C. 6', 'D. 8', 'E. 10'),
           ('A. 2', 'B. 4', 'C. 6', 'D. 8', 'E. 10'),
           ('A. 2', 'B. 4', 'C. 6', 'D. 8', 'E. 10'),
           ('A. 2', 'B. 4', 'C. 6', 'D. 8', 'E. 10'),
)
answers = ('A', 'B', 'C', 'D', 'E')
guesses = []
score = 0
question_number = 0

for question in questions:
    print('-' * 10)
    print(question)
    for option in options[question_number]:
        print(option)
        
    guess = input('Enter your answer (A - E): ').upper()
    guesses.append(guess)   
    if guess == answers[question_number]:
        score += 1
        print('CORRECT') 
    else:
        print('INCORRECT')
        print(f'{answers[question_number]} is the correct answer')
        
    question_number += 1

print()
print('=' * 20)
print('====== RESULT ======')    
print('=' * 20)

print()

print(f'Your score is {score}/5')    

print('answer: ', end='')
for answer in answers:
    print(answer, end=' ')
print()

print('guess: ', end='')
for guess in guesses:
    print(guess, end=' ')
print()
