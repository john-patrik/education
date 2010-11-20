#!/bin/bash

for i in $(ls -c *.java);
do
echo adding $i ...
cat $i >> all.txt
done
