#include <variable_make.h>

t_variable *variable_make(t_u32 key)
{
  t_variable *variable = calloc(1, sizeof(t_variable));
  variable->key = key;
  return variable;
}
