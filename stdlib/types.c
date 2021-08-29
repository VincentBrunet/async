#include "types.h"

/**
 * Global native types
 */

t_type *type_value = NULL;

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

t_type *type_object = NULL;
t_type *type_function = NULL;
t_type *type_string = NULL;
t_type *type_boolean = NULL;
t_type *type_null = NULL;

/**
 * Global Utils
 */

void types_init() {
  type_value = type_factory(0);

  type_u8 = type_factory_value(0);
  type_u16 = type_factory_value(0);
  type_u32 = type_factory_value(0);
  type_u64 = type_factory_value(0);

  type_i8 = type_factory_value(0);
  type_i16 = type_factory_value(0);
  type_i32 = type_factory_value(0);
  type_i64 = type_factory_value(0);

  type_f32 = type_factory_value(0);
  type_f64 = type_factory_value(0);

  type_object = type_factory_value(0);
  type_function = type_factory_value(0);
  type_string = type_factory_value(0);
  type_boolean = type_factory_value(0);
  type_null = type_factory_value(0);
}

t_type *type_factory(t_u32 parents) {
  t_type *value = calloc(1, sizeof(t_type));
  value->parent_count = parents;
  if (parents > 0) {
    value->parent_array = calloc(parents, sizeof(t_type*));
  }
  return value;
}

t_type *type_factory_value(t_u32 parents) {
  t_type *type = type_factory(parents + 1);
  type->parent_array[parents] = type_value;
  return type;
}

int type_sort_compare(const void* a, const void *b) {
  return (uintptr_t)a - (uintptr_t)b;
}
void type_sort(t_type *type) {
  qsort(
    type->parent_array,
    type->parent_count,
    sizeof(t_type *),
    type_sort_compare
  );
}

t_boolean type_find_recursor(t_type **haystack, t_type *needle, t_u32 start, t_u32 end) {
  if (end < start) {
    return FALSE;
  }
  t_u32 mid = (start + end) / 2;
  t_type *center = haystack[mid];
  if (center == needle) {
    return TRUE;
  } else if (center > needle) {
    return type_find_recursor(haystack, needle, start, mid - 1);
  } else {
    return type_find_recursor(haystack, needle, mid + 1, end);
  }
}
t_boolean type_is(t_type *type, t_type *other) {
  t_u32 count = type->parent_count;
  if (count <= 0) {
    return FALSE;
  }
  return type_find_recursor(type->parent_array, other, 0, count - 1);
}
