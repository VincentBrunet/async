#include <value_make.h>

t_value *value_make(t_type *type) {
  t_value *value = calloc(1, sizeof(t_value));
  value->type = type;
  return value;
}
