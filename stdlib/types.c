#include <stdlib.h>

#include "types.h"

/**
 * Types memory
 */

t_type *type_i32 = 0;
t_type *type_i64 = 0;
t_type *type_string = 0;

/**
 * Types factories
 */
t_type *type_factory(t_u32 parents) {
  t_type *value = malloc(sizeof(t_type));
  value->parent_count = parents;
  if (parents > 0) {
    value->parent_array = calloc(parents, sizeof(t_type*));
  }
  return value;
}
