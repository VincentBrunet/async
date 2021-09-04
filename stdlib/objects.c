#include "objects.h"
#include "values.h"

/**
 * Global utils
 */

void objects_init() {

}

t_object *object_alloc() {
  return calloc(1, sizeof(t_object));
}

void object_init(t_object *object, t_u32 size) {
  object->size = size;
  if (size > 0) {
    object->fields = calloc(size, sizeof(t_variable));
  }
}

void object_key(t_object *object, t_u32 idx, t_u32 key) {
  object->fields[idx].key = key;
}

t_i32 object_variable_compare(const void *a, const void *b) {
  return ((t_variable *)a)->key - ((t_variable *)b)->key;
}

t_variable *object_get(t_object *object, t_u32 name) {
  t_variable dummy;
  dummy.key = name;
  void *result = bsearch(
    &dummy,
    object->fields,
    object->size,
    sizeof(t_variable),
    object_variable_compare
  );
  if (result == NULL) {
    return NULL;
  }
  return ((t_variable *)result);
}
