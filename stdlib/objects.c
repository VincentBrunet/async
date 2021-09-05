#include "objects.h"
#include "values.h"

/**
 * Global utils
 */

void object_init(t_value *value, t_u32 size)
{
  t_object *object = (t_object *)value;
  object->size = size;
  if (size > 0)
  {
    object->variables = calloc(size, sizeof(t_variable));
  }
}

void object_key(t_value *value, t_u32 idx, t_u32 key)
{
  t_object *object = (t_object *)value;
  object->variables[idx].key = key;
}

t_i32 object_variable_compare(const void *a, const void *b)
{
  return ((t_variable *)a)->key - ((t_variable *)b)->key;
}

t_variable *object_get(t_value *value, t_u32 name)
{
  t_object *object = (t_object *)value;
  t_variable dummy;
  dummy.key = name;
  void *result = bsearch(
      &dummy,
      object->variables,
      object->size,
      sizeof(t_variable),
      object_variable_compare);
  return ((t_variable *)result);
}
