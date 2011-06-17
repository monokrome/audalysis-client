BUILD_DIR = build
PREFIX = .

core_files = audalysis.js
out_filename = audalysis$(1)

files = src/$(1)/prefix.js \
        $(foreach file,$(core_files),src/$(file)) \
        src/$(1)/suffix.js

all: generic

generic: setup_dirs
	cat $(call files,generic) > ${BUILD_DIR}/$(call out_filename,.js)

setup_dirs:
	mkdir -p ${BUILD_DIR}

clean:
	@@echo "Removing build directory."
	@@rm -rf ${BUILD_DIR}
