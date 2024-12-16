from tkinter import *
from functools import partial
win = Tk()
row_num, col_num = 2, 0
res = Label(win, width=20, text="0", fg="white", bg="#444444", font=('Times New Roman', 30), anchor="e")
res.grid(row=0, column=0, columnspan=4, sticky="nsew", padx=5, pady=5)
btn_txt = ['*', '//', '%', 'C','7', '8', '9', '+','4', '5', '6', '-','1', '2', '3', '','.', '0', '=', '/']
last_equals = [False]
def function(value):
    txt = res.cget("text")
    if value == 'C':
        res.config(text="0")
        last_equals[0] = False
    elif value == '=':
            res.config(text=str(eval(txt)))
            last_equals[0] = True
    else:
        if last_equals[0]:
            txt = "0" if value.isdigit() or value == '.' else txt
        res.config(text=txt + value if txt != "0" else value)
        last_equals[0] = False
for txt in btn_txt:
    Button(win, text=txt, width=6, height=3, fg='#333333', bg="#6A5ACD", font=('Times New Roman', 16), command=partial(function, txt)).grid(row=row_num, column=col_num, sticky="nsew", padx=5, pady=5)
    col_num += 1
    if col_num == 4: col_num, row_num = 0, row_num + 1
win.title("Calculator ni jassim for sale"), win.geometry("460x540+525+170"), win.config(bg="#2E2E2E"), win.mainloop()