#include <closure_variable.h>

int closure_variable_compare(const void *a, const void *b)
{
  t_u64 keyA = (*(t_variable **)a)->key;
  t_u64 keyB = (*(t_variable **)b)->key;
  if (keyA == keyB)
  {
    return 0;
  }
  else if (keyA > keyB)
  {
    return 1;
  }
  else
  {
    return -1;
  }
}

t_variable *closure_variable(t_closure *closure, t_u64 key)
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
