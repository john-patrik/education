/* file.c
 * Mathias Ljung, January 2008 
 * Functions used for dealing with files */

#include <stdio.h>

#include "file.h"

/* Check if a file exists 
 * IN: Name of the file to open
 * OUT: Status -1 = DO NOT EXIST, 0 = EXIST */ 
int file_check_if_exist(char *Filename)
{
	FILE *handle;

	if ((handle = fopen((char*)Filename, "r")) != NULL)
	{
		fclose(handle);	
		return 0;	
	}

 return -1;

}

/* Read a vector from a file
 * IN: Vector to store the values in, number of values to read, filename to read from
 * OUT: Status, 0 = OK, -1 ERROR */
int readVectorFromFile(int vector[], int numberOfValues, char *Filename)
{
	int i = 0;
	FILE *handle;

	if ((handle = fopen(Filename, "r")) == NULL)
		return -1;

	while (i < numberOfValues)
	{
		fscanf(handle, "%i", &vector[i]);
		i++;
	}

	fclose(handle);
	
	return 0;
}
	
/* Write a vector to a given file
 * IN: Vector with the values in, number of values to write, filename to write to
 * OUT: Status, 0 = OK, -1 = ERROR */
int writeVectorToFile(int vector[], int numberOfValues, char *Filename)
{
	 int i = 0;
	 FILE *handle;

	if ((handle = fopen(Filename, "w")) == NULL)
	   return -1;

        while (i < numberOfValues)
        {
            fprintf(handle, "%i\n", vector[i]);
            i++;
        }

	fclose(handle);


	return 0;
}
