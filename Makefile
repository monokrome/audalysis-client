JS_ENGINE = `which node`

BUILD_DIR = build
PREFIX = .
MINIFIER = ./node_modules/uglify-js/bin/uglifyjs

PATH := ./$(BUILD_DIR)/:$(PATH)

core_files = audalysis.js
out_filename = $(BUILD_DIR)/audalysis$(1).js
build_type = $(patsubst .%,%,$(1))
minified_build_type = $(1).min

files = src/$(1)/prefix.js \
        $(foreach file,$(core_files),src/$(file)) \
        src/$(1)/suffix.js

# Different output files, each representing a different use-case for Audalysis.
standard = $(out_filename)
jquery = $(call out_filename,.jquery)
require = $(call out_filename,.require)

all: $(standard) $(jquery) $(require)

$(call out_filename,%): setup_build
	@@echo "Building $@"
	@@cat $(call files,$(call build_type,$*)) > $@

	@@echo "Minifying code output"
	@@${MINIFIER} $@ > $(call out_filename,$(call minified_build_type,$*))

# TODO: How can I get the previous rule to build this one?
$(standard): setup_build
	@@echo "Building $@"
	@@cat $(call files,standard) > $@

setup_build: submodules
	@@mkdir -p $(BUILD_DIR)

submodules:
	@@echo "Updating git modules..."
	@@git submodule update --init

clean:
	@@echo 'Removing build directory.'
	@@rm -rf $(BUILD_DIR)

.PHONY: setup_build clean submodules

