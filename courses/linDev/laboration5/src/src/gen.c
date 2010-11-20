/* gen.c 
 * Mathias Ljung, January 2008 
 * Functions to generate a number of values */

#include <stdio.h>
#include <time.h>
#include <stdlib.h>

#include "gen.h"

/* Generate a number of values 
 * IN: Number of values to generate, the vectors to store the values in
 * OUT: - */
void generateValues(int numberOfValues, int vector[])
{

 time_t seconds;
 time(&seconds);

 srand((unsigned int)seconds);

 int i = 0;
 
 while (i < numberOfValues)
 {
	 vector[i] =  rand() % 75;
	 i++;
 }
 
}

