JS_ENGINE ?= `which node`

BUILD_DIR ?= build
PREFIX ?= .
MINIFIER ?= ./node_modules/uglify-js/bin/uglifyjs

PATH := ./$(BUILD_DIR)/:$(PATH)

# List of source files relative to the src directory.
core_files = audalysis.js

# Defines the filename that will be generated at the end of processing.
#   - $(1) will be replaced with the specific build type prefixed by a dot.
out_filename = $(BUILD_DIR)/audalysis$(1).js

# Used to pull a leading dot out of a given pattern in order to get a build type
build_type = $(patsubst .%,%,$(1))

# The pattern which will be applied to our build type's name for minified files
minified_build_type = $(1).min

# This is used in order to generate the final file list for a given build type
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

$(standard): setup_build
	@@echo "Building $@"
	@@cat $(call files,standard) > $@

	@@echo "Minifying code output"
	@@${MINIFIER} $@ > $(call out_filename,$(call minified_build_type,$*))

setup_build: submodules
	@@mkdir -p $(BUILD_DIR)

submodules:
	@@echo "Updating git modules..."
	@@git submodule update --init

clean:
	@@echo 'Removing build directory.'
	@@rm -rf $(BUILD_DIR)

.PHONY: setup_build clean submodules

