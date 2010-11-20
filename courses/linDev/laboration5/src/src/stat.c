/* stat.c
 * Mathias Ljung, January 2008 
 * Simple statistic functions */

#include <stdio.h>

#include "stat.h"


/* Calculate the minimum value of values in a vector
 * IN: The vector, number of values in the vector 
 * OUT: The minimum value */ 
int statMinValue(int vector[], int numberOfValues)
{
	int min = (int)vector[0];
	int i = 1;

	while (i < numberOfValues)
	{
		if (min > (int)vector[i])
			min = (int)vector[i];
		i++;
	}
	
		return min;
}

/* Calculate the maximum value of values in a vector
 * IN: The vector, the number of values in the vector 
 * OUT: The maximum value */           
int statMaxValue(int vector[], int numberOfValues)
{
	int max = (int)vector[0];
        int i = 1;

        while (i < numberOfValues)
        {
  	        if (max < (int)vector[i])
         	       max = (int)vector[i];
		 i++;
        }
			
	return max;
}

/* Calculate the mean value of values in a vector
 * IN: The vector, the number of values in the vector
 * OUT: The mean value */
float statMeanValue(int vector[], int numberOfValues)
{
	int sum = 0;
 	int i = 0;

	while (i < numberOfValues)
	{
		sum+=(int)vector[i];
		i++;
	}


	return (float)sum/(float)numberOfValues;
}

