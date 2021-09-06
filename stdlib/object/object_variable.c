#include <object_variable.h>

t_i32 object_variable_compare(const void *a, const void *b)
{
  return ((t_variable *)a)->key - ((t_variable *)b)->key;
}

t_variable *object_variable(t_value *value, t_u32 key)
{
  t_variable dummy;
  dummy.key = key;
  void *result = bsearch(
      &dummy,
      value->content.object.variables,
      value->content.object.size,
      sizeof(t_variable),
      object_variable_compare);
  return ((t_variable *)result);
}
