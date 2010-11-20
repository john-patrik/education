/* File: makefile */
CDIR = src
HDIR = include
INSTALLDIR = ~/bin
CFLAGS = -c -Wall -I $(HDIR)
LDFLAGS = -o
OFILES = main.o file.o gen.o stat.o
BINFILE = program1
vpath %.c $(CDIR)
vpath %.h $(HDIR)

all : $(BINFILE)
$(BINFILE) : $(OFILES)
	gcc $^ $(LDFLAGS) $@
main.o : file.h gen.h stat.h 
file.o : file.h
gen.o : gen.h
stat.o : stat.h
%.o : %.c
	gcc $(CFLAGS) $<
install : $(BINFILE)
	mv $< $(INSTALLDIR)
uninstall :
	rm $(INSTALLDIR)/$(BINFILE)
clean : 
	rm $(OFILES) $(BINFILE)
