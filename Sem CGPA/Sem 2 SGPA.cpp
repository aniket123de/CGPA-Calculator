#include<stdio.h>
int main()
{
	int chel,csl,grap,chet,cst,mat,engt,engl;
	float sgpa=0,n=0,result=0;
	printf("\nEnter Grade for Chemistry Lab : ");
	scanf("%d",&chel);
	printf("\nEnter Grade for C Lab : ");
	scanf("%d",&csl);
	printf("\nEnter Grade for Graphics Lab : ");
	scanf("%d",&grap);
	printf("\nEnter Grade for English Lab : ");
	scanf("%d",&engl);	
	printf("\nEnter Grade for Chemistry Theory : ");
	scanf("%d",&chet);
	printf("\nEnter Grade for C Theory : ");
	scanf("%d",&cst);
	printf("\nEnter Grade for Math Theory : ");
	scanf("%d",&mat);
	printf("\nEnter Grade for English Theory : ");
	scanf("%d",&engt);	
	
	
	result = ((chel*1.5)+(engl*1)+(grap*3)+(csl*2)+(chet*4)+(cst*3)+(mat*4)+(engt*2));
	n = (result*10);
	sgpa = n/205;
	
	
	printf("\nYour SGPA is : %.2f",sgpa);
	return 0;
}
