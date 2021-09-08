#include <variable_make.h>

t_variable *variable_make(t_u32 key, t_value *value)
{
  t_variable *variable = calloc(1, sizeof(t_variable));
  variable->key = key;
  variable->value = value;
  return variable;
}
