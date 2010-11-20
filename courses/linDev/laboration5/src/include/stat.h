/* stat.h
 * Mathias Ljung, January 2008 
 * Simple statistic functions */

#ifndef STAT_H
#define STAT_H

/* Calculate the minimum value of values in a vector
 * IN: The vector, number of values in the vector 
 * OUT: The minimum value */ 
int statMinValue(int vector[], int numberOfValues);

/* Calculate the maximum value of values in a vector
 * IN: The vector, the number of values in the vector 
 * OUT: The maximum value */           
int statMaxValue(int vector[], int numberOfValues);

/* Calculate the mean value of values in a vector
 * IN: The vector, the number of values in the vector
 * OUT: The mean value */
float statMeanValue(int vector[], int numberOfValues);

#endif
