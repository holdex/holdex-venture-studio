#!/bin/bash

if ! test -f .env; then
	touch .env
else 
	echo 'env1 file already created'	
fi

node pull-env.js >> .env