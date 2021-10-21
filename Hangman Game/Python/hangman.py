import os
import time
name = "home"
def game_over(flag, showDashes, lives):
    if flag == 0 and lives != 0: 
            lives = lives - 1
            showHangman(lives)
            print("Your guess was wrong try again")
            print("Lives left ", lives)
    if lives == 0:
        print("You lost!!! Word was : ", name)
    return showDashes, lives
def showHangman(lives):
    if lives == 4:
        print("")
        print("                               O  ")
    elif lives == 3:
        print("                               O  ")
        print("                              /|  ")
    elif lives == 2:
        print("                               O  ")
        print("                              /|\\  ")
    elif lives == 1:
        print("                               O  ")
        print("                              /|\\  ")
        print("                               |  ")
        print("                              /   ")
    elif lives == 0:
        print("                               O  ")
        print("                              /|\\  ")
        print("                               |  ")
        print("                              / \\  ")
def play_game(name):
    showDashes = ""
    flag = 0
    lives = 5
    for n in name:
        showDashes = showDashes + "-"  
    while "-" in showDashes and lives != 0:
       
        os.system('cls' if os.name == 'nt' else 'clear')
        print("**************GUESS WORD****************")
        print(f"Word : {showDashes}                    Lives : {lives}")
        print("****************************************")
        try:
            guess = input("Enter the guess: ")[0]
            if guess in name:
                index = name.index(guess)
                print("Guess word is correct")
                showDashes = showDashes[:index] + guess + showDashes[index + 1: ]
                print(showDashes)
                flag = 1
                continue
            else:
                flag = 0
            showDashes, lives = game_over(flag, showDashes, lives)
            time.sleep(1)
        except:
            print("Enter characters only")
            continue
def instructions():
    print("1. User is required to give input which will be later checked")
    print("2. User has 5 lives")
    print("3. If input is wrong life will be decreased by 1")
    print("4. If input is correct life will remain the same and correct place will be shown")
    print("5. For every wrong guess hangman body part will be added")
    print("6. On game over correct word will be shown")


while True:
    os.system('cls' if os.name == 'nt' else 'clear')   
    print("****WELCOME TO HANGMAN GAME****")
    print("1.Play the game\n2.See the instructions\n3.Exit")
    choice = int(input()) 
    if choice == 1:
        play_game(name)
    elif choice == 2:
        instructions()
    else:
        break
print("****THANKS FOR PLAYING****")