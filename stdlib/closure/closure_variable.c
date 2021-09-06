#include <closure_variable.h>

t_i32 closure_variable_compare(const void *a, const void *b)
{
  return (*(t_variable **)a)->key - (*(t_variable **)b)->key;
}

t_variable *closure_variable(t_closure *closure, t_u32 key)
{
  t_variable dummy;
  dummy.key = key;
  void *result = bsearch(
      &dummy,
      closure->variables,
      closure->size,
      sizeof(t_variable *),
      closure_variable_compare);
  return (*(t_variable **)result);
}
