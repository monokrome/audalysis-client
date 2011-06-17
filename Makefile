BUILD_DIR = build
PREFIX = .

core_files = audalysis.js
out_filename = audalysis.$(1)

files = src/$(1)/prefix.js \
        $(foreach file,$(core_files),src/$(file)) \
        src/$(1)/suffix.js

all: generic require jquery

generic: setup_dirs
	cat $(call files,generic) > ${BUILD_DIR}/$(call out_filename,js)

require: setup_dirs
	cat $(call files,require) > ${BUILD_DIR}/$(call out_filename,require.js)

jquery: setup_dirs
	cat $(call files,jquery) > ${BUILD_DIR}/$(call out_filename,jquery.js)

setup_dirs:
	mkdir -p ${BUILD_DIR}

clean:
	@@echo "Removing build directory."
	@@rm -rf ${BUILD_DIR}
