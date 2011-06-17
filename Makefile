CONTAINER = generic
BUILD_DIR = build
PREFIX = .

core_files = audalysis.js
audalysis = ${BUILD_DIR}/audalysis.js

all: ${audalysis}

${audalysis}: setup_dirs
	cat src/${CONTAINER}/prefix.js \
	    $(foreach file,$(core_files),"src/$(file)") \
      src/${CONTAINER}/suffix.js > ${audalysis}

setup_dirs:
	mkdir -p ${BUILD_DIR}

clean:
	@@echo "Removing build directory."
	@@rm -rf ${BUILD_DIR}
