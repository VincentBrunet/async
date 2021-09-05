#include "closures.h"
#include "values.h"

/**
 * Global utils
 */

void closure_init(t_closure *closure, t_u32 size)
{
  closure->size = size;
  if (size > 0)
  {
    closure->variables = calloc(size, sizeof(t_variable));
  }
}

t_i32 closure_variable_compare(const void *a, const void *b)
{
  return (*(t_variable **)a)->key - (*(t_variable **)b)->key;
}

t_variable *closure_get(t_closure *closure, t_u32 name)
{
  t_variable dummy;
  dummy.key = name;
  void *result = bsearch(
      &dummy,
      closure->variables,
      closure->size,
      sizeof(t_variable *),
      closure_variable_compare);
  if (result == NULL)
  {
    return NULL;
  }
  return (*(t_variable **)result);
}
