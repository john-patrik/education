/* file.h
 * Mathias Ljung, January 2008 
 * Functions used for dealing with files */

#include <stdio.h>

#ifndef FILE_H
#define FILE_H


/* Check if a file exists
 * IN: Name of the file to open
 * OUT: Status -1 = DO NOT EXIST, 0 = EXIST */
int file_check_if_exist(char *Filename);

/* Read a vector from a file
 * IN: Vector to store the values in, number of values to read, filename to read from
 * OUT: Status, 0 = OK, -1 ERROR */
int readVectorFromFile(int vector[], int numberOfValues, char *Filename);
	
/* Write a vector to a given file
 * IN: Vector with the values in, number of values to write, filename to write to
 * OUT: Status, 0 = OK, -1 = ERROR */
int writeVectorToFile(int vector[], int numberOfValues, char *Filename);

#endif
