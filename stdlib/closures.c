#include "closures.h"
#include "values.h"

/**
 * Global utils
 */

void closures_init() {

}

void closure_init(t_closure *closure, t_u32 size) {
  closure->size = size;
  if (size > 0) {
    closure->fields = calloc(size, sizeof(t_variable));
  }
}

void closure_key(t_closure *closure, t_u32 idx, t_u32 key) {
  closure->fields[idx].key = key;
}

t_i32 closure_variable_compare(const void *a, const void *b) {
  return ((t_variable *)a)->key - ((t_variable *)b)->key;
}

t_variable *closure_get(t_closure *closure, t_u32 name) {
  t_variable dummy;
  dummy.key = name;
  void *result = bsearch(
    &dummy,
    closure->fields,
    closure->size,
    sizeof(t_variable),
    closure_variable_compare
  );
  if (result == NULL) {
    return NULL;
  }
  return ((t_variable *)result);
}
