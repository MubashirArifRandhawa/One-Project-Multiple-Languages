#include <iostream>
#include <string.h>
using std::cout;
using std::cin;
using std::string;
using std::endl;
//defined a word
char WordToGuess[] = "home";
//5 lives
int lives = 5;
//flag set to show wrong or right guess message and also to decrease health
int flag = 0;
void print(char *c){
	while(*c != '\0'){
		cout<<*c;
	}
	cout<<endl;
}
void show_hangman(int lives){
	if(lives == 4){
		cout<<"  O  "<<endl;
	}
	else if(lives == 3){
		cout<<"  O  "<<endl;
		cout<<" /|  "<<endl;
	}
	else if(lives == 2){
		cout<<"  O  "<<endl;
		cout<<" /|\\ "<<endl;
	}
	else if(lives == 1){
		cout<<"  O  "<<endl;
		cout<<" /|\\ "<<endl;
		cout<<"  | "<<endl;
		cout<<" /| "<<endl;
	}
	else if(lives == 0){
		cout<<"  O  "<<endl;
		cout<<" /|\\ "<<endl;
		cout<<"  | "<<endl;
		cout<<" / \\ "<<endl;
	}
}
int game_over(bool check, int lives){
		if(lives == 0){
			cout<<"You Lost!!! Word was : ";
			print(WordToGuess);
		}
		else{
			lives -= 1;
			show_hangman(lives);
			cout<<"Wrong guess!!"<<endl;	
		}
		return lives;
}
void fill_blanks(char *C, char *showDashes){
	int i = 0;
	while(*C != '\0'){
		showDashes[i++] = '-';
		C++;
	}
}
int check_guess(char *C, char showDashes[], char *guess){
	int index = 0;
	flag = 0;
	while(*C != '\0'){
				if(*C == *guess){
					showDashes[index] = *guess;
					flag = 1;
				}
				index++;
				C++;
	}
	if(flag == 1){
		cout<<"Guess was correct"<<endl;
		return 1;
	}
	else{
		cout<<"Wrong guess!!! Try Again."<<endl;
		return 0;	
	}
}
void play_game(){ 
	
	char showDashes[100] = "";
	char *C = WordToGuess;	
	fill_blanks(WordToGuess, showDashes);
	while (lives != 0) {
		if(strcmp(WordToGuess, showDashes) != 0){
		char guess;
		cout<<"**************GUESS WORD****************\n";
		cout<<"Word : "<<showDashes<<"                    Lives : "<< lives<<endl;
		cout<<"****************************************"<<endl;
			cout<<"Enter the guess: ";
			cin>>guess;
			int status = check_guess(WordToGuess, showDashes, &guess);
			if(!status){
				lives = game_over(status, lives);				
			}
			
		}
		else{
			cout<<"You won!!! Word was indeed '"<<WordToGuess<<"'"<<endl;
			break;
		}
	}
}
void instructions(){
	cout<<"1. User is required to give input which will be later checked\n";
	cout<<"2. User has 5 lives\n";
	cout<<"3. If input is wrong life will be decreased by 1\n";
	cout<<"4. If the input is correct life will remain the same and guess will be put in the correct place\n";
	cout<<"5. For every wrong guess hangman body part will be added\n";
	cout<<"6. On game over correct word will be shown\n";
}

int main(){
	
	while(true){
		cout<<"****WELCOME TO HANGMAN GAME****\n";
	cout<<"1.Play the game\n2.See the instructions\n3.Exit\n";
	int choice;
	cin>>choice;
		if(choice == 1){
			play_game();
		}
		else if(choice == 2){
			instructions();
		}
		else{
			break;
		}
	}	
}
