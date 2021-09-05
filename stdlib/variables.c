#include "variables.h"

/**
 * Global utils
 */

t_variable *variable_factory(t_u32 key) {
  t_variable *variable = calloc(1, sizeof(t_variable));
  variable->key = key;
  return variable;
}
