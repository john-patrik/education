/* main.c
 * Mathias Ljung, January 2008
 * A program to test some functions */

/* Argument
 * -r n FILENAME  Read n values from the given file 
 * -g n FILENAME  Generate n values and save them in the given file
 * -h Show help message
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "file.h"
#include "gen.h"
#include "stat.h"

int main(int argc, char *argv[])
{
	char helpMessage[] = 
			"\nA program that calculate some basic stastics using values in a file\n" \
			"or using values that are generated and then saved to a file.\n\n Arguments:\n\t\""\
			"-r n FILENAME\" to read n values from the given file\n\t\"-g n FILENAME\""\
			" to generate n values and save in the given file\n\n";

 char Filename[256];
 int numberOfValues;


 	/* GENERATE VALUES */
	if (argc == 4 && (!strcmp(argv[1], "-g")))
 	{
	 	numberOfValues = atoi(argv[2]);
	 	strcpy(Filename,argv[3]);
	 
	 	int values[numberOfValues];
	 	generateValues(numberOfValues, values);
	 
	 	if ((file_check_if_exist(Filename)) == 0)
		{
			 char answer;
		         printf("%s exists. Do you want to erase the file? [Y/N]", Filename);
			 scanf("%c", &answer);	
			 if (answer == 'n' || answer == 'N')
         		 {
				printf("ERROR! Unable to write to %s.\n", Filename);
		 		return -1;
			 }
		}

		if ((writeVectorToFile(values, numberOfValues, Filename)) == -1)
		{
			printf("ERROR! Unable to write to %s.\n", Filename);
			return -1;
		}

		printf("Minimum value: %i\n", statMinValue(values, numberOfValues));
		printf("Maximum value: %i\n", statMaxValue(values, numberOfValues));
		printf("Mean value: %f\n", statMeanValue(values, numberOfValues));

	}
	
	/* READ VALUES FROM FILE */
	else if (argc == 4 && (!strcmp(argv[1], "-r")))
	{	
		 numberOfValues = atoi(argv[2]);
                 strcpy(Filename,argv[3]);

                 int values[numberOfValues];
                 generateValues(numberOfValues, values);

		 if ((file_check_if_exist(Filename)) != 0)
		 {
			 printf("ERROR! Unable to open %s.\n", Filename);
                         return -1;
		 }

 		 readVectorFromFile(values, numberOfValues, Filename);
		 
		 printf("Minimum value: %i\n", statMinValue(values, numberOfValues));
		 printf("Maximum value: %i\n", statMaxValue(values, numberOfValues));
		 printf("Mean value: %f\n", statMeanValue(values, numberOfValues));	
	
	}
	
	/* IF BAD ARGUMENTS */
	else
	   {
	   	printf("%s", helpMessage);
	   }

	return 0;
}


