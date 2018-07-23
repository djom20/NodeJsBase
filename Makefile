default: server

server:
	sudo PORT=$(arg) nodemon server
	# ISDEBUG=TRUE node server

PHONY: server