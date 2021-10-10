#include <module/module_import.h>

typedef struct t_loaded {
  t_ref **(*loader)();
  t_ref **exports;
} t_loaded;

t_loaded *loaded_array = NULL;
t_u32 loaded_count = 0;

int module_loaded_compare(const void *a, const void *b) {
  t_loaded *ea = (t_loaded *)a;
  t_loaded *eb = (t_loaded *)b;
  uintptr_t la = (uintptr_t)ea->loader;
  uintptr_t lb = (uintptr_t)eb->loader;
  if (la == lb) {
    return 0;
  } else if (la > lb) {
    return 1;
  } else {
    return -1;
  }
}

t_loaded *module_loaded_find(t_ref **(*loader)()) {
  t_loaded dummy;
  dummy.loader = loader;
  void *result = bsearch(
      &dummy,
      loaded_array,
      loaded_count,
      sizeof(t_loaded),
      module_loaded_compare);
  return ((t_loaded *)result);
}

t_ref *module_import(t_ref **(*loader)(), t_u32 idx) {
  t_loaded *loaded = module_loaded_find(loader);
  if (loaded != NULL) {
    return loaded->exports[idx];
  }
  t_ref **exports = loader();
  loaded_array = realloc(loaded_array, loaded_count + 1);
  loaded_array[loaded_count].loader = loader;
  loaded_array[loaded_count].exports = exports;
  loaded_count++;
  qsort(loaded_array, loaded_count, sizeof(t_loaded), module_loaded_compare);
  return exports[idx];
}
