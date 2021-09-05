#include "types.h"

/**
 * Global native types
 */

t_type *type_root = NULL;

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

t_type *type_alloc()
{
  return calloc(1, sizeof(t_type));
}

void type_init(t_type *type, t_u32 parents)
{
  type->parent_count = parents;
  if (parents > 0)
  {
    type->parent_array = calloc(parents, sizeof(t_type *));
  }
}

void types_init()
{
  type_root = type_alloc();

  type_u8 = type_factory(0);
  type_u16 = type_factory(0);
  type_u32 = type_factory(0);
  type_u64 = type_factory(0);

  type_i8 = type_factory(0);
  type_i16 = type_factory(0);
  type_i32 = type_factory(0);
  type_i64 = type_factory(0);

  type_f32 = type_factory(0);
  type_f64 = type_factory(0);

  type_object = type_factory(0);
  type_function = type_factory(0);
  type_string = type_factory(0);
  type_boolean = type_factory(0);
  type_null = type_factory(0);
}

t_type *type_factory(t_u32 parents)
{
  t_type *type = type_alloc();
  type_init(type, parents + 1);
  type->parent_array[parents] = type_root;
  return type;
}

int type_sort_compare(const void *a, const void *b)
{
  return (uintptr_t)a - (uintptr_t)b;
}
void type_sort(t_type *type)
{
  qsort(
      type->parent_array,
      type->parent_count,
      sizeof(t_type *),
      type_sort_compare);
}

t_i32 type_bsearch(const void *a, const void *b)
{
  return (uintptr_t)a - (uintptr_t)b;
}

t_boolean type_is(t_type *type, t_type *other)
{
  void *result = bsearch(
      other,
      type->parent_array,
      type->parent_count,
      sizeof(t_type *),
      type_bsearch);
  return result != NULL;
}
