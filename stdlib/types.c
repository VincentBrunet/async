#include <stdlib.h>

#include "types.h"

/**
 * Types memory
 */

t_type *type_u8 = NULL;
t_type *type_u16 = NULL;
t_type *type_u32 = NULL;
t_type *type_u64 = NULL;

t_type *type_i8 = NULL;
t_type *type_i16 = NULL;
t_type *type_i32 = NULL;
t_type *type_i64 = NULL;

t_type *type_f32 = NULL;
t_type *type_f64 = NULL;
t_type *type_f128 = NULL;

t_type *type_string = NULL;

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
