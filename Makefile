BUILD_DIR = build
PREFIX = .

core_files = audalysis.js
out_filename = $(BUILD_DIR)/audalysis$(1).js

files = src/$(1)/prefix.js \
        $(foreach file,$(core_files),src/$(file)) \
        src/$(1)/suffix.js

# Different output files, each representing a different use-case for Audalysis.
generic = $(call out_filename,.generic)
jquery = $(call out_filename,.jquery)
require = $(call out_filename,.require)

all: $(generic) $(jquery) $(require)

$(call out_filename,.%): setup_dirs
	@@echo "Building $@"
	@@cat $(call files,$*) > $@

setup_dirs:
	@@mkdir -p $(BUILD_DIR)

clean:
	@@echo 'Removing build directory.'
	@@rm -rf $(BUILD_DIR)

