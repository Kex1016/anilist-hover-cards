SHELL := /bin/bash
EXECUTABLES = sed rm mkdir date m4 cp sass
K := $(foreach exec,$(EXECUTABLES),\
	$(if $(shell which $(exec)),some string,$(error "Could not find the dependency '$(exec)'.")))

all: clean build post-build

clean:
	$(info Cleaning up...)
	rm -rf build

build: template.m4 css/style.scss main.js
	$(info $(shell date))
	$(info Starting build...)
	mkdir -p build
	sass --no-source-map --style compressed css/style.scss css/style.css
	m4 --prefix-builtins template.m4 > build/al-profile-cards.user.js
	date +"%s" | sed 's_^_//AL Profile Hover Cards - Built at _' >> build/al-profile-cards.user.js

post-build:
	$(info Build complete!)
	xclip -selection clipboard < build/al-profile-cards.user.js
	$(info The code has been copied to your clipboard.)
