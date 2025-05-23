#include<stdio.h>
int main()
{
	int phyl,elecl,mech,phyt,elect,mat;
	float sgpa=0,n=0,result=0;
	printf("\nEnter Grade for Physics Lab : ");
	scanf("%d",&phyl);
	printf("\nEnter Grade for Electrical Lab : ");
	scanf("%d",&elecl);
	printf("\nEnter Grade for Mechanical Lab : ");
	scanf("%d",&mech);
	printf("\nEnter Grade for Physics Theory : ");
	scanf("%d",&phyt);
	printf("\nEnter Grade for Electrical Theory : ");
	scanf("%d",&elect);
	printf("\nEnter Grade for Math Theory : ");
	scanf("%d",&mat);
	
	result = ((phyl*1.5)+(elecl*1)+(mech*3)+(phyt*4)+(elect*4)+(mat*4));
	n = (result*10);
	sgpa = n/175;
	
	
	printf("Your SGPA is : %.2f",sgpa);
	return 0;
}
